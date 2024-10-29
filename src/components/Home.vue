<template>
    <div>
        <div class="jumbotron text-center bg-light">
            <h1 class="display-4">Bienvenido a la App de Reseñas de Películas</h1>
            <p class="lead">Consulta las películas más populares y deja tu opinión.</p>
            <hr class="my-4">
            <p>¡Explora y disfruta de las mejores películas!</p>
            <a class="btn btn-primary btn-lg" href="/peliculas" role="button">Ver Películas</a>
        </div>

        <div class="container">
            <h2 class="text-center my-4">Películas Recomendadas</h2>
            <div class="row">
                <div class="col-md-4" v-for="movie in recommendedMovies" :key="movie.id">
                    <div class="card mb-4 shadow-sm">
                        <img :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
                             class="card-img-top"
                             :alt="movie.title" />
                        <div class="card-body">
                            <h5 class="card-title">{{ movie.title }}</h5>
                            <p class="card-text">{{ movie.overview.substring(0, 100) }}...</p>
                            <a :href="`/peliculas/${movie.id}`" class="btn btn-primary">Ver Detalles</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <Footer />
    </div>
</template>

<script>
    import tmdbService from '../services/tmdbService';
    import Footer from '../components/Footer.vue'; // Importa el componente Footer

    export default {
        data() {
            return {
                recommendedMovies: [],
            };
        },
        async created() {
            try {
                const data = await tmdbService.getPopularMovies();
                this.recommendedMovies = data.results.slice(0, 6);
            } catch (error) {
                console.error('Error loading recommended movies:', error);
            }
        },
        components: {
            Footer, // Registra el componente Footer
        },
    };
</script>

<style scoped>
    .jumbotron {
        background-color: #f8f9fa;
        border-radius: 0.3rem;
        padding: 2rem 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .card {
        border: none;
        transition: transform 0.3s;
    }

        .card:hover {
            transform: scale(1.05);
        }

    .card-title {
        font-size: 1.5rem;
        color: #343a40;
    }

    .card-text {
        font-size: 1rem;
        color: #6c757d;
    }

    .btn-primary {
        background-color: #007bff;
        border: none;
    }

        .btn-primary:hover {
            background-color: #0056b3;
        }
</style>
