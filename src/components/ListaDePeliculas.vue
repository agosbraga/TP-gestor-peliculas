<template>
    <div>
      <h1>Películas</h1>
      <ul>
        <li v-for="movie in movies" :key="movie.id">
          <img 
            :src="`https://image.tmdb.org/t/p/w185${movie.poster_path}`" 
            :alt="movie.title" 
            style="width: 342px; height: auto;" 
          />
          <p>{{ movie.title }}</p>
        </li>
      </ul>
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