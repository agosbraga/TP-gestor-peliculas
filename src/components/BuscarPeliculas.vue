<template>
  <div class="container my-4">
      <h1 class="text-center">Buscar Películas</h1>
        <div class="input-group mb-3">
          <input
              type="text"
              v-model="query"
              placeholder="Ingresa el título de la película"
              class="form-control"
              @keyup.enter="buscarPeliculas"
          />
          <button class="btn btn-primary" @click="buscarPeliculas">Buscar</button>
      </div>

      <div v-if="peliculas.length" class="mt-4">
          <h2>Resultados de la Búsqueda</h2>
          <ul class="list-group">
              <li
                  v-for="pelicula in peliculas"
                  :key="pelicula.id"
                  class="list-group-item d-flex align-items-center"
                  @click="verDetallePelicula(pelicula.id)"
                  style="cursor: pointer;"
              >
                  <img :src="getPosterUrl(pelicula.poster_path)" alt="Poster" width="50" class="me-3" />
                  <div>
                      <h5>{{ pelicula.title }}</h5>
                      <p>{{ pelicula.overview }}</p>
                      <small class="text-muted">Fecha de lanzamiento: {{ pelicula.release_date }}</small>
                  </div>
              </li>
          </ul>
      </div>
      <p v-else-if="buscado" class="text-center">No se encontraron resultados.</p>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  const TMDB_API_KEY = '603d7bde6e4548b50f364043d0b4115c';
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  
  export default {
  name: 'BuscarPeliculas',
  data() {
    return {
      query: '',        
      peliculas: [],    
      buscado: false,   
    };
  },
  created() {
    this.query = this.$route.query.q || '';
    if (this.query) {
      this.buscarPeliculas();
    }
  },
  watch: {
    '$route.query.q'(newQuery) {
      this.query = newQuery || '';
      if (this.query) {
        this.buscarPeliculas();
      }
    }
  },
  methods: {
    async buscarPeliculas() {
      if (this.query.trim() === '') return;
      this.buscado = true;
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
          params: {
            api_key: TMDB_API_KEY,
            query: this.query,
            language: 'es-ES',
          },
        });
        this.peliculas = response.data.results;
      } catch (error) {
        console.error('Error al buscar películas:', error);
      }
    },
    getPosterUrl(posterPath) {
      return posterPath ? `https://image.tmdb.org/t/p/w200${posterPath}` : 'URL_DE_IMAGEN_POR_DEFECTO';
    },
    verDetallePelicula(id) {
      this.$router.push({ name: 'DetallePelicula', params: { id } });
    },
  },
};
  </script>
  
  <style scoped>
  .container {
      max-width: 800px;
  }
  
  .input-group .btn {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
  }
  
  .input-group .form-control:focus {
      z-index: 1;
      box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }
  
  .list-group-item:hover {
      background-color: #f8f9fa;
  }
  </style>