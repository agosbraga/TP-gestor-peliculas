<template>
  <div id="app">
   
    <Navbar />
    
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'; 


export default {
  name: 'App',
  components: {
    Navbar, 
   }
};
</script>

<style>

body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa; 
  margin: 0;
  padding: 0;
}
</style>