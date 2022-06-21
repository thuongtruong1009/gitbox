<script setup lang="ts">
import { useUser } from '../stores/user';
const user = useUser()
</script>

<template>
<div class="plugin-static-container max-w-225 w-225 shadow-lg shadow-gray-700/50">
    <img :src="`https://activity-graph.herokuapp.com/graph?username=${user.userName}&theme=react-dark&hide_border=true&area=true`" alt="" class="rounded-lg w-full">
</div>
</template>