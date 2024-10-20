import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import ListaDePeliculas from '../components/ListaDePeliculas.vue';
import DetallePelicula from '../components/DetallePelicula.vue';


const routes = [
    {path: '/', component: Home},
    {path: '/about', name: 'About', component: About },
    {path: '/peliculas', name: 'ListaDePeliculas', component: ListaDePeliculas },
    { path: '/peliculas/:id', name: 'DetallePelicula', component: DetallePelicula },
   
]

const router = createRouter ({
    history: createWebHistory(),
    routes,
});

export default router;