<template>
    <div class="user-list mt-4">
      <h4>Usuarios con actividad reciente</h4>
      <ul class="list-group">
        <li v-for="user in users" class="list-group-item">            
            {{ user[0] }} - {{ new Date(user[1]['createdAt']).toDateString() }} - {{ user[1]['movieId'] }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      users: Array,
    },
  };
  </script>
  