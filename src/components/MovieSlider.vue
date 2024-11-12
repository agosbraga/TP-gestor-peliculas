<template>
    <div class="movie-slider position-relative overflow-hidden">
      <!-- Slides -->
      <div 
        class="slides-container h-100" 
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div 
          v-for="(movie, index) in movies" 
          :key="movie.id"
          class="slide position-absolute w-100 h-100"
          :style="{ left: `${index * 100}%` }"
        >
          <img 
            :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
            :alt="movie.title"
            class="w-100 h-100 object-fit-cover"
          />
          <div class="slide-content position-absolute bottom-0 start-0 w-100 p-4 p-md-5 text-white">
            <div class="container">
              <h2 class="movie-title">{{ movie.title }}</h2>
              <p class="movie-overview d-none d-md-block">{{ movie.overview.substring(0, 150) }}...</p>
              <p class="movie-overview d-block d-md-none">{{ movie.overview.substring(0, 80) }}...</p>
              <a :href="`/peliculas/${movie.id}`" class="btn btn-primary">Ver Detalles</a>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Navigation Buttons -->
      <button 
        @click="prevSlide" 
        class="btn btn-dark position-absolute start-0 top-50 translate-middle-y ms-3 rounded-circle"
        v-show="movies.length > 1"
      >
        <i class="bi bi-chevron-left"></i>
      </button>
      
      <button 
        @click="nextSlide" 
        class="btn btn-dark position-absolute end-0 top-50 translate-middle-y me-3 rounded-circle"
        v-show="movies.length > 1"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
  
      <!-- Indicators -->
      <div class="position-absolute bottom-0 start-50 translate-middle-x mb-3">
        <button 
          v-for="(_, index) in movies" 
          :key="index"
          @click="goToSlide(index)"
          class="btn btn-sm mx-1 rounded-circle"
          :class="currentSlide === index ? 'btn-light' : 'btn-outline-light'"
        >
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MovieSlider',
    props: {
      movies: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        currentSlide: 0,
        autoplayInterval: null
      }
    },
    methods: {
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.movies.length;
      },
      prevSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.movies.length - 1 : this.currentSlide - 1;
      },
      goToSlide(index) {
        this.currentSlide = index;
      },
      startAutoplay() {
        this.autoplayInterval = setInterval(this.nextSlide, 5000);
      },
      stopAutoplay() {
        if (this.autoplayInterval) {
          clearInterval(this.autoplayInterval);
        }
      }
    },
    mounted() {
      console.log('Películas recibidas en el slider:', this.movies);
      this.startAutoplay();
    },
    beforeUnmount() {
      this.stopAutoplay();
    },
    watch: {
      currentSlide(newValue) {
        console.log('Cambiando a slide:', newValue);
      }
    }
  }
  </script>
  
  <style scoped>
  .movie-slider {
    height: 400px;
  }
  
  @media (max-width: 768px) {
    .movie-slider {
      height: 300px;
    }
  }
  
  .slides-container {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  
  .slide {
    transition: opacity 0.5s ease-in-out;
  }
  
  .slide-content {
    background: linear-gradient(transparent, rgba(0,0,0,0.9));
  }
  
  .btn-dark {
    opacity: 0.7;
  }
  
  .btn-dark:hover {
    opacity: 1;
  }
  
  .object-fit-cover {
    object-fit: cover;
    object-position: center;
  }
  </style>