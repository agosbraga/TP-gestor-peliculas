<template>
  <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">App de Películas</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/peliculas">Películas</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/guardadas">Guardadas</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/vistas">Vistas</router-link>
          </li>
          <li v-if="isAdmin" class="nav-item">
            <router-link class="nav-link" to="/admin">Admin</router-link>
          </li>
          
        </ul>
        
        <ul class="navbar-nav ms-auto">
          <li v-if="!isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/login">Iniciar Sesión</router-link>
            <router-link class="nav-link" to="/register">Registrarse</router-link>
          </li>
          <li v-else class="nav-item dropdown">
            <a 
              class="nav-link dropdown-toggle" 
              href="#" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              {{ user?.username }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><button @click="logout" class="dropdown-item">Cerrar sesión</button></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);
const isAdmin = computed(() => authStore.user?.role === 'admin');

const logout = () => {
  authStore.logout();
  router.push('/'); // Redirige a la página principal
};
</script>

<style scoped>
    .navbar {
        padding: 1rem 2rem;
    }

    .navbar-brand {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .nav-link {
        color: #f4faff;
        margin: 0 10px;
    }

        .nav-link:hover {
            color: #007bff;
        }

    .dropdown-item {
        color: #c77070;
    }

        .dropdown-item:hover {
            background-color: #191b1d;
        }
</style>
