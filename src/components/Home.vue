<template>
    <div>
      <div class="jumbotron text-center bg-light">
        <h1 class="display-4">Bienvenido a la App de Reseñas de Películas</h1>
        <p class="lead">Consulta las películas más populares y deja tu opinión.</p>
        <hr class="my-4">
        <p>¡Explora y disfruta de las mejores películas!</p>
        <a class="btn btn-primary btn-lg" href="/peliculas" role="button">Ver Películas</a>
      </div>
  
      <div class="container">
        <h2 class="text-center my-4">Películas Recomendadas</h2>
        <div class="row">
          <div class="col-md-4" v-for="movie in recommendedMovies" :key="movie.id">
            <div class="card mb-4 shadow-sm">
              <img 
                :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`" 
                class="card-img-top" 
                :alt="movie.title" 
              />
              <div class="card-body">
                <h5 class="card-title">{{ movie.title }}</h5>
                <p class="card-text">{{ movie.overview.substring(0, 100) }}...</p>
                <a :href="`/peliculas/${movie.id}`" class="btn btn-primary">Ver Detalles</a>
              </div>
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
        recommendedMovies: [], 
      };
    },
    async created() {
      try {
        const data = await tmdbService.getPopularMovies();
        this.recommendedMovies = data.results.slice(0, 6); 
      } catch (error) {
        console.error('Error loading recommended movies:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  .jumbotron {
    background-color: #f8f9fa;
    border-radius: 0.3rem;
  }
  
  .card {
    border: none;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
  
  .card-text {
    font-size: 0.9rem;
  }
  </style>