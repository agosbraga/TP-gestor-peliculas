<template>
    <div class="dashboard">
        <h2>Métricas</h2>

        <!-- Usuarios Activos y Top de Películas -->
        <div class="top-metrics">
            <MetricCard title="Usuarios Activos" :value="metrics.activeUsers" icon="user" />
            <TopMovies :movies="topMovies" />
        </div>

        <!-- Diferencia de Puntuaciones -->
        <RatingDifference />

        <!-- Usuarios con Actividad Reciente -->
        <UserList :users="activeUsers" />
    </div>
</template>

<script>
    import MetricCard from './MetricCard.vue';
    import UserList from './UserList.vue';
    import TopMovies from './TopMovies.vue';
    import RatingDifference from './RatingDifference.vue';

export default {
    components: { 
        MetricCard,UserList, TopMovies,RatingDifference },
        data() {
            return {
                metrics: {
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
                try {
                    const response = await fetch('https://671825ecb910c6a6e02b35be.mockapi.io/api/resenias');
                    const data = await response.json();

                    const reviewCounts = {};

                    data.forEach(review => {
                        const { movieId } = review;
                        reviewCounts[movieId] = (reviewCounts[movieId] || 0) + 1;
                    });

                    const sortedMovies = Object.entries(reviewCounts)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 3)
                        .map(([movieId, count]) => ({ movieId, count }));

                    this.topMovies = sortedMovies;
                } catch (error) {
                    console.error('Error al obtener películas:', error);
                }
            },

            async fetchActiveUsers() {
                try {
                    const response = await fetch('https://671825ecb910c6a6e02b35be.mockapi.io/api/resenias');
                    const data = await response.json();

                    const currentDate = new Date();
                    const activeUsersMap = new Map();

                    data.forEach(review => {
                        const reviewDate = new Date(review.createdAt);
                        const differenceInDays = Math.floor((currentDate - reviewDate) / (1000 * 60 * 60 * 24));

                        if (differenceInDays <= 30) {
                            activeUsersMap.set(review.userId, {
                                name: review.name,
                                createdAt: review.createdAt,
                            });
                        }
                    });

                    this.metrics.activeUsers = activeUsersMap.size;
                    this.activeUsers = Array.from(activeUsersMap.values());
                } catch (error) {
                    console.error('Error al obtener usuarios activos:', error);
                }
            },
        },
    };
</script>

<style scoped>
    .dashboard {
        background-color: #f8f9fa;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    h2 {
        color: #222222;
        font-weight: bold;
        font-size: 24px;
        margin-bottom: 20px;
    }

    .top-metrics {
        display: flex;
        gap: 20px;
        align-items: stretch;
        margin-bottom: 20px;
    }

    .metric-card,
    .top-movies {
        flex: 1;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

        .metric-card .card-content,
        .top-movies .card-content {
            text-align: center;
            width: 100%;
        }

    .metric-title {
        font-size: 18px;
        color: #555555;
        margin-bottom: 8px;
    }

    .metric-value {
        font-size: 48px;
        font-weight: bold;
        color: #222222;
    }
</style>
