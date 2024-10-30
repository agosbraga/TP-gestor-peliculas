<template>
    <div>
      <!-- Formulario de Reseña (solo visible si el usuario está autenticado) -->
      <div v-if="isAuthenticated" class="card mb-4">
        <div class="card-body">
          <form @submit.prevent="submitReview">
            
            
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
      <div v-else class="alert alert-warning">
        Por favor, <a href="/login">inicia sesión</a> para dejar una reseña.
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
  </template>
  
  <script>
  import axios from 'axios';
  import { useAuthStore } from '../store/auth';
  
  const MOCKAPI_BASE_URL = 'https://671825ecb910c6a6e02b35be.mockapi.io/api';
  
  export default {
    name: 'Resenas',
  
    props: {
      movieId: {
        type: Number,
        required: true
      }
    },
  
    data() {
      return {
        reviews: [],
        newReview: {
          name: '',
          calificacion: 5,
          comentario: '',
          movieId: null
        },
        isAuthenticated: false // Estado de autenticación
      };
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
            review => review.movieId === this.movieId
          );
        } catch (error) {
          console.error('Error al obtener reseñas:', error);
        }
      },
  
      async submitReview() {
        if (!this.isAuthenticated) {
          alert("Por favor, inicia sesión para enviar una reseña.");
          return;
        }

        try {
          const authStore = useAuthStore();
          const user = authStore.user;
          
          this.newReview.movieId = this.movieId;
          this.newReview.name = `${user.name} ${user.lastName}`;
          this.newReview.userId = user.id;
          
          await axios.post(`${MOCKAPI_BASE_URL}/resenias`, this.newReview);
          await this.fetchReviews();
          
          // Limpiar formulario
          this.newReview = {
            calificacion: 5,
            comentario: '',
          };
        } catch (error) {
          console.error('Error al enviar la reseña:', error);
        }
      }
    },
  
    created() {
      const authStore = useAuthStore();
      this.isAuthenticated = authStore.isAuthenticated; // Obtiene el estado de autenticación
      this.fetchReviews(); // Carga las reseñas al crear el componente
    }
  };
  </script>
  
  <style scoped>
  .card {
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>