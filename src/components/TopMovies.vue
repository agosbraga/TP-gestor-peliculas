<template>
    <div class="top-movies">
        <h3>Top 3 Películas con más Reseñas</h3>
        <ul>
            <li v-for="(movie, index) in movies" :key="movie.movieId">
                <span class="movie-title">{{ index + 1 }}: {{ movie.name }}</span>
                <span class="movie-description">Reseñas: {{ movie.count }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            movies: Array
        }
    };
</script>

<style scoped>
    .top-movies {
        background-color: #ffffff;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        margin-top: 30px;
        margin: 0 auto;
    }

        .top-movies h3 {
            color: #222222;
            font-size: 1.5em;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
        }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        width: 500px;
        font-size: 16px;
        color: #444444;
        border-bottom: 1px solid #e0e0e0;
        padding: 12px 0;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    .movie-title {
        display: block;
        font-weight: bold;
        color: #333333;
        margin-bottom: 4px;
    }

    .movie-description {
        display: block;
        color: #555555;
    }

    li:hover {
        background-color: #f0f0f0;
        color: #222222;
    }
</style>