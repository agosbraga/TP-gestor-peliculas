<template>
    <div class="container my-4">
      <h1 class="text-center mb-4">Películas Vistas</h1>
      <div class="row">
        <div 
          v-for="movie in movies" 
          :key="movie.id"
          class="col-md-4 mb-4"
        >
          <div class="card shadow-sm">
            <img 
              :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`" 
              :alt="movie.title" 
              class="card-img-top"
            />
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p>Tu calificación: {{ movie.userRating }}/10</p>
              <a 
                class="btn btn-primary" 
                :href="`/peliculas/${movie.id}`"
              >Ver detalles</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import tmdbService from '../services/tmdbService';
  import { useAuthStore } from '../store/auth';
  
  export default {
    data() {
      return {
        movies: []
      }
    },
  
    async created() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get('https://671825ecb910c6a6e02b35be.mockapi.io/api/resenias');
        const userReviews = response.data.filter(review => review.userId === authStore.user.id);
  
        const moviesWithDetails = await Promise.all(
          userReviews.map(async (review) => {
            const movieDetails = await tmdbService.getMovieDetails(review.movieId);
            return {
              ...movieDetails,
              userRating: review.calificacion
            };
          })
        );
  
        this.movies = moviesWithDetails;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  </script>