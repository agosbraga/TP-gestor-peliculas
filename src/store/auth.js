import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await axios.get('https://fakestoreapi.com/users');// usando FAKE STORE API
        const user = response.data.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          this.user = user;
          this.token = 'fake-jwt-token'; // Simula el token
          this.isAuthenticated = true;

          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', this.token);
        } else {
          this.isAuthenticated = false;
          alert('Credenciales inválidas');
        }
      } catch (error) {
        console.error('Error al autenticar:', error);
        alert('Ocurrió un error en el inicio de sesión');
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    loadFromLocalStorage() {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.token = localStorage.getItem('token');
      this.isAuthenticated = !!this.token;
    },
  },
});
