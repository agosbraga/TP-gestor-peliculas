import axios from 'axios';

const API_KEY = '603d7bde6e4548b50f364043d0b4115c'; // Reemplaza con tu clave de API
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbService = {
  async getPopularMovies(page = 1) {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          page: page,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  async searchMovies(query) {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching for movies:', error);
      throw error;
    }
  },

  
};

export default tmdbService;