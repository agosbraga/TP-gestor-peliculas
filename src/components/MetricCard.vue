<template>
    <div class="card text-center">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <h2>{{ value }}</h2>
        <i :class="`fa fa-${icon} fa-2x`"></i>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      value: Number,
      icon: String,
    },
  };
  </script>
  
  <style scoped>
  .card {
    margin: 10px 0;
  }
  </style>
  