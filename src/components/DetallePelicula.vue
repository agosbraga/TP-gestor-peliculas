<template>
  <div class="container my-4">
    <!-- Detalles de la Película -->
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
          <p><strong>Calificación TMDB:</strong> {{ movie.vote_average }}/10</p>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <p>Cargando detalles...</p>
    </div>

    <!-- Sección de Reseñas -->
    <div class="row mt-5">
      <div class="col-12">
        <h2 class="mb-4">Reseñas</h2>
        
        <!-- Formulario de Reseña -->
        <div class="card mb-4">
          <div class="card-body">
            <form @submit.prevent="submitReview">
              <div class="mb-3">
                <label for="name" class="form-label">Nombre</label>
                <input 
                  type="text" 
                  class="form-control"
                  id="name" 
                  v-model.trim="newReview.name" 
                  required
                >
              </div>
              
              <div class="mb-3">
                <label for="rating" class="form-label">Calificación</label>
                <select 
                  class="form-select"
                  id="rating" 
                  v-model.number="newReview.calificacion" 
                  required
                >
                  <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>
              
              <div class="mb-3">
                <label for="comment" class="form-label">Comentario</label>
                <textarea 
                  class="form-control"
                  id="comment" 
                  v-model.trim="newReview.comentario" 
                  rows="3"
                  required
                ></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary">
                Enviar Reseña
              </button>
            </form>
          </div>
        </div>

        <!-- Lista de Reseñas -->
        <div v-if="reviews.length > 0">
          <div v-for="review in reviews" :key="review.id" class="card mb-3">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">{{ review.name }}</h5>
                <span class="badge bg-primary">{{ review.calificacion }}/10</span>
              </div>
              <p class="text-muted small">{{ formatDate(review.createdAt) }}</p>
              <p class="card-text">{{ review.comentario }}</p>
            </div>
          </div>
        </div>
        <p v-else class="text-center">No hay reseñas disponibles para esta película.</p>
      </div>
    </div>
  </div>
</template>

<script>
import tmdbService from '../services/tmdbService';
import axios from 'axios';

const MOCKAPI_BASE_URL = 'https://671825ecb910c6a6e02b35be.mockapi.io/api';

export default {
  name: 'DetallePelicula',
  
  data() {
    return {
      movie: null,
      reviews: [],
      newReview: {
        name: '',
        calificacion: 5,
        comentario: '',
        movieId: null
      }
    };
  },

  computed: {
    posterUrl() {
      return this.movie?.poster_path 
        ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
        : null;
    }
  },

  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    async fetchReviews() {
      try {
        const response = await axios.get(`${MOCKAPI_BASE_URL}/resenias`);
        this.reviews = response.data.filter(
          review => review.movieId === parseInt(this.$route.params.id)
        );
      } catch (error) {
        console.error('Error al obtener reseñas:', error);
      }
    },

    async submitReview() {
      try {
        this.newReview.movieId = parseInt(this.$route.params.id);
        await axios.post(`${MOCKAPI_BASE_URL}/resenias`, this.newReview);
        await this.fetchReviews();
        
        // Limpiar formulario
        this.newReview = {
          name: '',
          calificacion: 5,
          comentario: '',
          movieId: null
        };
      } catch (error) {
        console.error('Error al enviar la reseña:', error);
      }
    }
  },

  async created() {
    const movieId = this.$route.params.id;
    try {
      const data = await tmdbService.getMovieDetails(movieId);
      this.movie = data;
      await this.fetchReviews();
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }
};
</script>

<style scoped>
.movie-info {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.card {
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>