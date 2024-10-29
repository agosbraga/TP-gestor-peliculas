<template>
  <div class="container my-4">
    <h1 class="text-center mb-4">Películas Populares</h1>
    <div class="row">
      <div 
        class="col-md-4 mb-4 d-flex align-items-stretch"
        v-for="movie in movies" 
        :key="movie.id"
      >
        <div class="card shadow-sm w-100 position-relative">
          <button 
            @click="toggleSaveMovie(movie.id)" 
            class="btn position-absolute top-0 end-0 m-2"
            v-if="isAuthenticated"
          >
            <i class="fas fa-star" :class="{ 'text-warning': isMovieSaved(movie.id) }"></i>
          </button>
          
          <img 
            :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`" 
            :alt="movie.title" 
            class="card-img-top"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">{{ movie.overview ? movie.overview.slice(0, 100) + '...' : 'Descripción no disponible' }}</p>
            <a 
              class="btn btn-primary mt-auto" 
              :href="`/peliculas/${movie.id}`" 
              >Ver más detalles</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tmdbService from '../services/tmdbService';
import { useAuthStore } from '../store/auth';
import axios from 'axios';

const MOCKAPI_BASE_URL = 'https://671825ecb910c6a6e02b35be.mockapi.io/api';

export default {
data() {
  return {
    movies: [],
    savedMovies: [],
    isAuthenticated: false
  };
},

async created() {
  const authStore = useAuthStore();
  this.isAuthenticated = authStore.isAuthenticated;

  try {
    // Cargar películas
    const data = await tmdbService.getPopularMovies();
    this.movies = data.results;

    // Si está autenticado, cargar películas guardadas
    if (this.isAuthenticated) {
      const response = await axios.get(`${MOCKAPI_BASE_URL}/savedMovies`);
      this.savedMovies = response.data.filter(m => m.userId === authStore.user.id);
    }
  } catch (error) {
    console.error('Error loading movies:', error);
  }
},

methods: {
  async toggleSaveMovie(movieId) {
  const authStore = useAuthStore();
  const userId = authStore.user.id;
  
  // Buscar si la película ya está guardada
  const existingSave = this.savedMovies.find(
    m => m.movieId === movieId && m.userId === userId && m.type === 'watchlist'
  );

  if (existingSave) {
    // Si existe, la eliminamos
    await axios.delete(`${MOCKAPI_BASE_URL}/savedMovies/${existingSave.id}`);
    this.savedMovies = this.savedMovies.filter(m => m.id !== existingSave.id);
  } else {
    // Si no existe, la guardamos
    const response = await axios.post(`${MOCKAPI_BASE_URL}/savedMovies`, {
      userId,
      movieId,
      type: 'watchlist' // Aquí especificamos que es una película guardada
    });
    this.savedMovies.push(response.data);
  }
},

  isMovieSaved(movieId) {
    if (!this.isAuthenticated) return false;
    const authStore = useAuthStore();
    return this.savedMovies.some(
      m => m.movieId === movieId && 
      m.userId === authStore.user.id && 
      m.type === 'watchlist'
    );
}
}
};
</script>

<style scoped>
.card-img-top {
max-height: 500px;
object-fit: cover;
}

.btn-star {
z-index: 1;
background: none;
border: none;
}

.fas.fa-star {
font-size: 1.5rem;
color: #ccc;
}

.fas.fa-star.text-warning {
color: #ffc107;
}
</style>