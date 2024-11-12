<template>
    <div class="metric-card">
        <div class="card-content">
            <p class="metric-title">{{ title }}</p>
            <p class="metric-value">{{ value }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            value: Number,
        },
    };
</script>

<style scoped>
    .metric-card {
        background-color: #ffffff;
        padding: 25px;
        border-radius: 16px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

        .metric-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

    .card-content {
        text-align: center;
    }

    .metric-title {
        font-size: 18px;
        color: #333333;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .metric-value {
        font-size: 52px;
        font-weight: bold;
        color: #111111;
    }
</style>