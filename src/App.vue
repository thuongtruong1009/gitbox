<template>
  <div id="app">
    <Main />
    <Accessibilities @childSendName="parentGetName($event)" />
    <Repositories />
  </div>
</template>

<script>
import Main from "./components/Main.vue";
import Accessibilities from "./components/Accessibilities.vue";
import Repositories from "./components/Repositories.vue";

export default {
  name: "App",
  components: {
    Main,
    Accessibilities,
    Repositories,
  },
};
</script>
