<template>
  <div id="app">
    <Main />
    <Accessibility />
  </div>
</template>

<script>
import Main from "./components/Main.vue";
import Accessibility from "./components/Accessibility.vue";

export default {
  name: "App",
  components: {
    Main,
    Accessibility,
  },
};
</script>
