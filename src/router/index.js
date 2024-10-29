import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import ListaDePeliculas from '../components/ListaDePeliculas.vue';
import DetallePelicula from '../components/DetallePelicula.vue';
import { useAuthStore } from '../store/auth';
import Admin from '../components/Admin.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

const routes = [
    {path: '/', component: Home},
    {path: '/about', name: 'About', component: About },
    {path: '/peliculas', name: 'ListaDePeliculas', component: ListaDePeliculas },
    { path: '/peliculas/:id', name: 'DetallePelicula', component: DetallePelicula },
    {path: '/login', name: 'Login', component: Login },
    {path: '/register', name: 'register', component: Register },
    { path: '/admin', name: 'Admin', component: Admin, meta: { requiereAuth: true, role: 'admin'}},
       
   
]

const router = createRouter ({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.role && to.meta.role !== authStore.user?.role) {
        next ({name: 'login'});
    } else {
        next()
    }
})

export default router;