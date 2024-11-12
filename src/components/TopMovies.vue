<template>
    <div class="card text-center">
      <div class="card-body">
        <h5 class="card-title">Top 3 Películas Más Vistas</h5>
        <ul class="list-group">
          <li v-for="(movie, index) in movies" class="list-group-item">
            <strong>#{{ index + 1 }}:</strong> {{ movie[0] }} - {{ movie[1] }} vistas
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      movies: Array,
    },
    };
  </script>
  
  <style scoped>
  .card {
    margin: 10px 0;
  }
  </style>
  