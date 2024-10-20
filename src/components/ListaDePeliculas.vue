<template>
    <div class="container my-4">
      <h1 class="text-center mb-4">Películas Populares</h1>
      <div class="row">
        <div 
          class="col-md-4 mb-4 d-flex align-items-stretch"
          v-for="movie in movies" 
          :key="movie.id"
        >
          <div class="card shadow-sm w-100">
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
  
  export default {
    data() {
      return {
        movies: [],
      };
    },
    async created() {
      try {
        const data = await tmdbService.getPopularMovies();
        this.movies = data.results;
      } catch (error) {
        console.error('Error loading movies:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  .card-img-top {
    max-height: 500px;
    object-fit: cover;
  }
  </style>
  