<template>
  <div class="container my-4">
    <h2>Registro</h2>
    <form @submit.prevent="handleRegister">
      
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input 
          type="text" 
          v-model="name" 
          id="name" 
          class="form-control"
          placeholder="Nombre" 
          required 
        />
      </div>
      <div class="mb-3">
        <label for="lastName" class="form-label">Apellido</label>
        <input 
          type="text" 
          v-model="lastName" 
          id="lastName" 
          class="form-control"
          placeholder="Apellido" 
          required 
        />
      </div>
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
      <button type="submit" class="btn btn-primary">Registrarse</button>
      si ya estás registrado, <a href="/login">haz click aquí</a>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import axios from 'axios';

const authStore = useAuthStore();
const router = useRouter();
const username = ref('');
const password = ref('');
const name = ref('');
const lastName = ref('');

const handleRegister = async () => {


  authStore.register(username.value, password.value);
  const response = await axios.post('https://6720f79198bbb4d93ca6e2b7.mockapi.io/user/users', {
    username: username.value,
    password: password.value,
    name: name.value,
    lastName: lastName.value
  });

  if (response.data) {
    router.push('/login');
  }
};
</script>