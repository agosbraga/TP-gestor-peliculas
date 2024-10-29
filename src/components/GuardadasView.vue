<template>
    <div class="container my-4">
      <h1 class="text-center mb-4">Mis Películas Guardadas</h1>
      <div class="row">
        <div 
          v-for="movie in movies" 
          :key="movie.id"
          class="col-md-4 mb-4"
        >
          <div class="card shadow-sm w-100 position-relative">
            <button 
              @click="removeSavedMovie(movie.savedMovieId)" 
              class="btn position-absolute top-0 end-0 m-2"
            >
              <i class="fas fa-star text-warning"></i>
            </button>
            
            <img 
              :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`" 
              :alt="movie.title" 
              class="card-img-top"
            />
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">{{ movie.overview ? movie.overview.slice(0, 100) + '...' : 'Descripción no disponible' }}</p>
              <a 
                class="btn btn-primary" 
                :href="`/peliculas/${movie.id}`"
              >Ver más detalles</a>
            </div>
          </div>
        </div>
        <div v-if="movies.length === 0" class="col-12 text-center">
          <p>No tienes películas guardadas</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import tmdbService from '../services/tmdbService';
  import { useAuthStore } from '../store/auth';
  
  const MOCKAPI_BASE_URL = 'https://671825ecb910c6a6e02b35be.mockapi.io/api';
  
  export default {
    data() {
      return {
        movies: []
      };
    },
  
    async created() {
      const authStore = useAuthStore();
      try {
        // Obtener películas guardadas
        const saved = await axios.get(`${MOCKAPI_BASE_URL}/savedMovies`);
        const userSaved = saved.data.filter(m => m.userId === authStore.user.id);
        
        // Obtener detalles de cada película
        const moviesDetails = await Promise.all(
          userSaved.map(async (saved) => {
            const movie = await tmdbService.getMovieDetails(saved.movieId);
            return { ...movie, savedMovieId: saved.id };
          })
        );
        
        this.movies = moviesDetails;
      } catch (error) {
        console.error('Error:', error);
      }
    },
  
    methods: {
      async removeSavedMovie(savedId) {
        try {
          await axios.delete(`${MOCKAPI_BASE_URL}/savedMovies/${savedId}`);
          this.movies = this.movies.filter(m => m.savedMovieId !== savedId);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .card-img-top {
    max-height: 500px;
    object-fit: cover;
  }
  </style>