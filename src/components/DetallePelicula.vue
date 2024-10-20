<template>
    <div v-if="movie">
      <h1>{{ movie.title }}</h1>
      <img :src="posterUrl" alt="Poster de la película" />
      <p>{{ movie.overview }}</p>
      <p><strong>Fecha de lanzamiento:</strong> {{ movie.release_date }}</p>
      <p><strong>Calificación:</strong> {{ movie.vote_average }}</p>
    </div>
    <div v-else>
      <p>Cargando detalles...</p>
    </div>
  </template>
  
  <script>
  import tmdbService from '../services/tmdbService';
  
  export default {
    data() {
      return {
        movie: null,
      };
    },
    computed: {
      posterUrl() {
        return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
      },
    },
    async created() {
      const movieId = this.$route.params.id;
      try {
        const data = await tmdbService.getMovieDetails(movieId);
        this.movie = data;
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    },
  };
  </script>
  