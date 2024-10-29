<template>
    <div class="container my-4">
      <h1 class="text-center">Panel de Administración</h1>
      <p class="text-muted text-center">Gestión de Reseñas</p>
  
      <div v-if="reviews.length" class="mt-4">
        <h2>Reseñas de Usuarios</h2>
        <ul class="list-group">
          <li 
            class="list-group-item d-flex justify-content-between align-items-center"
            v-for="review in reviews" 
            :key="review.id"
          >
            <div>
              <h5>{{ review.name }}</h5>
              <p>{{ review.comentario }}</p>
              <small class="text-muted">Calificación: {{ review.calificacion }}/10</small>
            </div>
            <button class="btn btn-danger btn-sm" @click="deleteReview(review.id)">Eliminar</button>
          </li>
        </ul>
      </div>
      <p v-else class="text-center">No hay reseñas disponibles.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  const MOCKAPI_BASE_URL = 'https://671825ecb910c6a6e02b35be.mockapi.io/api';
  
  export default {
    name: 'Admin',
  
    data() {
      return {
        reviews: [],
      };
    },
  
    methods: {
      async fetchReviews() {
        try {
          const response = await axios.get(`${MOCKAPI_BASE_URL}/resenias`);
          this.reviews = response.data;
        } catch (error) {
          console.error('Error al cargar las reseñas:', error);
        }
      },
  
      async deleteReview(id) {
        try {
          await axios.delete(`${MOCKAPI_BASE_URL}/resenias/${id}`);
          this.reviews = this.reviews.filter(review => review.id !== id);
        } catch (error) {
          console.error('Error al eliminar la reseña:', error);
        }
      },
    },
  
    async created() {
      await this.fetchReviews();
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  
  .list-group-item {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  