<template>
  <div id="app">
    <Main />
    <Accessibilities @childSendName="parentGetName($event)" />
    <Repositories />
    <SideBar />
    <Footer />
  </div>
</template>

<script>
import Main from "./components/Main.vue";
import Accessibilities from "./components/Accessibilities.vue";
import Repositories from "./components/Repositories.vue";
import SideBar from "./components/SideBar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Main,
    Accessibilities,
    Repositories,
    SideBar,
    Footer,
  },
};
</script>
<style>
#app {
  background-image: url("https://www.speedtest.net/global-index/public/images/globe@2x.png");
  background-size: 110%;
  background-repeat: no-repeat;
  background-position: center 15%;
  width: 99.8%;
  height: 100%;
  overflow-y: scroll;
}
</style>

