import axios from 'axios';

const API_KEY = '603d7bde6e4548b50f364043d0b4115c'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbService = {
  async getPopularMovies(page = 1) {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          page: page,
          language: 'es-ES',  // Agregamos soporte para español
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener películas populares:', error);
      throw error;
    }
  },

  async searchMovies(query) {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
          language: 'es-ES',  // Agregamos soporte para español
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al buscar películas:', error);
      throw error;
    }
  },

  async getMovieDetails(movieId) {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          language: 'es-ES',  // Agregamos soporte para español
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener detalles de la película:', error);
      throw error;
    }
  },
};

export default tmdbService;