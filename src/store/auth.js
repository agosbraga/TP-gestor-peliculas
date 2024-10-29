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
        const response = await axios.get('https://6720f79198bbb4d93ca6e2b7.mockapi.io/user/users');// mockapi
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
    async register(username, password) {
      try {
        const response = await axios.get('https://6720f79198bbb4d93ca6e2b7.mockapi.io/user/users');
        const userExists = response.data.find((u) => u.username === username);
    
        if (userExists) {
          alert('El usuario ya existe. Intenta con otro nombre de usuario.');
          return;
        }
    
        // Crear el nuevo usuario con un POST si no existe
        const newUser = { username, password };
        const createUserResponse = await axios.post('https://6720f79198bbb4d93ca6e2b7.mockapi.io/user/users', newUser);
    
        this.user = createUserResponse.data;
        this.token = 'fake-jwt-token'; // Simula el token
        this.isAuthenticated = true;
    
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', this.token);
    
        alert('Registro exitoso. ¡Bienvenido!');
      } catch (error) {
        console.error('Error al registrar:', error);
        alert('Ocurrió un error en el registro');
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
