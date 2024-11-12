<template>
    <div class="user-list">
        <h3>Usuarios con actividad reciente</h3>
        <ul>
            <li v-for="user in users" :key="user.name">
                {{ user.name }} - Ultima actividad: {{ new Date(user.createdAt).toLocaleDateString() }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            users: Array
        }
    };
</script>

<style scoped>
    .user-list {
        background-color: #ffffff;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        margin-top: 30px;
    }

        .user-list h3 {
            color: #333333;
            font-weight: 600;
            margin-bottom: 20px;
        }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        font-size: 14px;
        color: #555555; 
        border-bottom: 1px solid #e0e0e0; 
        padding: 10px 0;
        transition: background-color 0.3s ease;
    }

        li:hover {
            background-color: #f7f7f7; 
        }
</style>