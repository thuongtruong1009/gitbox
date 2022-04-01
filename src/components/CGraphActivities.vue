<script setup lang="ts">
import { userStore } from '../stores/user';
const store = userStore()
</script>

<template>
<div class="plugin-static-container max-w-225 w-225">
    <img :src="`https://activity-graph.herokuapp.com/graph?username=${store.userName}&theme=react-dark&hide_border=true&area=true`" alt="" class="rounded-lg w-full">
</div>
</template>