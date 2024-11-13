<template>
    <div class="rating-card">
        <h3>Diferencia de Puntuación</h3>
        <div class="movies-container">
            <div v-for="movie in moviesWithDifference" :key="movie.movieId" class="movie-item">
                <img 
                    :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" 
                    :alt="movie.title"
                    class="movie-image"
                />
                <div class="movie-details">
                    <h4>{{ movie.title }}</h4>
                    <p>TMDB: {{ movie.tmdbRating }}/10</p>
                    <p>Usuarios: {{ movie.userRating.toFixed(1) }}/10</p>
                    <p class="difference">Diferencia: {{ Math.abs(movie.difference).toFixed(1) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import tmdbService from '../services/tmdbService';

export default {
    name: 'RatingDifference',
    data() {
        return {
            moviesWithDifference: []
        }
    },
    async mounted() {
        await this.calculateDifferences();
    },
    methods: {
        async calculateDifferences() {
            try {
                // 1. Obtener todas las reseñas
                const response = await fetch('https://671825ecb910c6a6e02b35be.mockapi.io/api/resenias');
                const reviews = await response.json();

                // 2. Calcular promedio por película
                const movieRatings = {};
                reviews.forEach(review => {
                    if (!movieRatings[review.movieId]) {
                        movieRatings[review.movieId] = {
                            total: 0,
                            count: 0
                        };
                    }
                    movieRatings[review.movieId].total += review.calificacion;
                    movieRatings[review.movieId].count += 1;
                });

                // 3. Obtener detalles de TMDB y calcular diferencias
                const differences = [];
                for (const movieId in movieRatings) {
                    const movieDetails = await tmdbService.getMovieDetails(movieId);
                    const userRating = movieRatings[movieId].total / movieRatings[movieId].count;
                    const tmdbRating = movieDetails.vote_average;

                    differences.push({
                        movieId,
                        title: movieDetails.title,
                        poster_path: movieDetails.poster_path,
                        tmdbRating,
                        userRating,
                        difference: userRating - tmdbRating
                    });
                }

                // 4. Ordenar por diferencia y tomar top 5
                this.moviesWithDifference = differences
                    .sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference))
                    .slice(0, 5);

            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
}
</script>

<style scoped>
.rating-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.movies-container {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding: 10px 0;
}

.movie-item {
    min-width: 200px;
    padding: 10px;
    border-radius: 8px;
    background: #f8f9fa;
}

.movie-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
}

.movie-details {
    margin-top: 10px;
}

.movie-details h4 {
    font-size: 16px;
    margin-bottom: 8px;
}

.movie-details p {
    margin: 4px 0;
    font-size: 14px;
}

.difference {
    color: #dc3545;
    font-weight: bold;
}
</style>