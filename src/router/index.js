import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import ListaDePeliculas from '../components/ListaDePeliculas.vue';


const routes = [
    {path: '/', component: Home},
    {path: '/about', name: 'About', component: About },
    {path: '/peliculas', name: 'ListaDePeliculas', component: ListaDePeliculas },
   
]

const router = createRouter ({
    history: createWebHistory(),
    routes,
});

export default router;