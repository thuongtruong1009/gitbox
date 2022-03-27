<script setup lang="ts">
import CHeaderMenu from "./components/CHeaderMenu.vue";
import CFooter from "./components/CFooter.vue";
</script>

<template>
  <CHeaderMenu msg="Gitbox"/>
  <RouterView />
  <CFooter />
</template>

<style>
#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
