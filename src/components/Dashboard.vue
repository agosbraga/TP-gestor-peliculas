<template>
    <div class="dashboard">
      <h2>Dashboard metricas</h2>
      <div class="row">
          <div class="col-md-4">
            <MetricCard title="Usuarios Activos" :value="metrics.activeUsers" icon="user" />
          </div>

        <div class="col-md-4">
        <TopMovies :movies="topMovies"/>
      </div>
      </div>
      <UserList :users="activeUsers" />
    </div>
  </template>
  
  <script>
    import MetricCard from './MetricCard.vue';
    import UserList from './UserList.vue';
    import TopMovies from './TopMovies.vue';
  
  export default {
    components: { MetricCard, UserList, TopMovies },
    data() {
      return {
        metrics: {
          newMovies: 0,
          recentReviews: 0,
          activeUsers: 0,
        },
        activeUsers: [],
        topMovies: [],
      };
    },
    mounted() {
      this.fetchActiveUsers();
      this.fetchTopMovies();
    },
    methods: {
      async fetchTopMovies() {
        const response = await fetch('https://671825ecb910c6a6e02b35be.mockapi.io/api/resenias');
        const data = await response.json();

        const reviewCounts = {};

        data.forEach(review => {
            const { movieId } = review;
            reviewCounts[movieId] = (reviewCounts[movieId] || 0) + 1;
        });

        const sortedMovies = Object.entries(reviewCounts)
            .sort((a, b) => b[1] - a[1])  // Orden descendente por número de reseñas
            .slice(0, 3)  // Seleccionar el top 3

        this.topMovies = sortedMovies;
    },
      async fetchActiveUsers() {
        // Llama a la API de usuarios
        const response = await fetch('https://671825ecb910c6a6e02b35be.mockapi.io/api/resenias');
        const data = await response.json().then(
            r => r.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
        const activeUsers = new Map();
        data.forEach(user => {
            if(!(user.name in activeUsers.keys())){
                const createdAt = user.createdAt;
                if(new Date(createdAt).getMonth() === (new Date().getMonth())){
                    this.metrics.activeUsers += 1;
                }
                const movieId = user.movieId; // traer el nombre de la pelicula
                activeUsers.set(user.name, {createdAt, movieId});
            }
        });
        this.activeUsers = activeUsers;
      },
    },
  };
  </script>
  