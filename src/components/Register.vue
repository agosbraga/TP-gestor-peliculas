<template>
    <div class="container my-4">
      <h2>Register</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input 
            type="text" 
            v-model="username" 
            id="username" 
            class="form-control"
            placeholder="Usuario" 
            required 
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input 
            type="password" 
            v-model="password" 
            id="password" 
            class="form-control" 
            placeholder="Contraseña" 
            required 
          />
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useAuthStore } from '../store/auth';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const router = useRouter();
  const username = ref('');
  const password = ref('');
  
  const handleLogin = async () => {
    // Intenta realizar el register
    await authStore.register(username.value, password.value);
  
    // Verifica si el usuario está autenticado y redirige según su rol
    if (authStore.isAuthenticated) {
      router.push('/home');
    } else {
      alert("Credenciales inválidas");
    }
  };
  
  // Cargar el estado de autenticación desde localStorage al montar el componente
  onMounted(() => {
    authStore.loadFromLocalStorage();
  });
  </script>
  