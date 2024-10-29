<template>
  <div class="container my-4">
    <div v-if="movie" class="row">
      <div class="col-md-4">
        <img 
          :src="posterUrl" 
          :alt="movie.title"
          class="img-fluid rounded shadow"
        />
      </div>
      <div class="col-md-8">
        <h1 class="mb-4">{{ movie.title }}</h1>
        <p class="lead">{{ movie.overview }}</p>
        <div class="movie-info">
          <p><strong>Fecha de lanzamiento:</strong> {{ formatDate(movie.release_date) }}</p>
          <div class="ratings-container">
            <p><strong>Calificación TMDB:</strong> {{ movie.vote_average }}/10</p>
            <p>
              <strong>Promedio reseñas usuarios:</strong> 
              <span v-if="promedioResenas !== null"> {{ promedioResenas.toFixed(1) }}/10</span>
              <span v-else class="text-muted">(Sin reseñas)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <p>Cargando detalles...</p>
    </div>

    <div class="row mt-5" v-if="movie">
      <div class="col-12">
        <h2 class="mb-4">Reseñas</h2>
        <Resenas v-if="movie" :movieId="movie.id" @reviews-loaded="updateAverage" />
      </div>
    </div>
  </div>
</template>

<script>
import tmdbService from '../services/tmdbService';
import Resenas from './Resenas.vue';
import axios from 'axios';

const MOCKAPI_BASE_URL = 'https://671825ecb910c6a6e02b35be.mockapi.io/api';

export default {
  name: 'DetallePelicula',

  components: {
    Resenas
  },

  data() {
    return {
      movie: null,
      promedioResenas: null,
      reviews: [], // Almacenar reseñas
    };
  },

  computed: {
    posterUrl() {
      return this.movie?.poster_path
        ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
        : ''; 
    }
  },

  async created() {
    const movieId = this.$route.params.id;
    try {
      const data = await tmdbService.getMovieDetails(movieId);
      this.movie = data;
      await this.fetchReviews(movieId); // Obtener reseñas al crear
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },

  methods: {
    async fetchReviews(movieId) {
  try {
    const response = await axios.get(`${MOCKAPI_BASE_URL}/resenias`);
    this.reviews = response.data.filter(review => Number(review.movieId) === Number(movieId));
    this.updateAverage();
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
  }
},

    updateAverage() {
      if (this.reviews.length > 0) {
        const total = this.reviews.reduce((sum, review) => sum + review.calificacion, 0);
        this.promedioResenas = total / this.reviews.length;
      } else {
        this.promedioResenas = null; // Sin reseñas
      }
    },

    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    }
  }
};
</script>