<template>
  <div class="container w-60 d-grid justify-content-center rounded-3">
    <div class="decorate d-md-flex justify-content-center">
        <!-- https://media.giphy.com/media/VgFIMqeyQr2yqD4jaa/giphy.gif -->
      <img
        src="https://media.giphy.com/media/vzF0lrwPoR9kc/giphy.gif"
        width="25px"
        height="25px"
        v-for="index in footerDecorates"
        :key="index"
      />
    </div>
    <p class="rounded-top rounded-3 px-2 bg-white text-center">{{footLable}}{{ this.time }}</p>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
export default {
  data() {
    return {
      footerDecorates: Array(33),
      time: new Date().toString().slice(0, 25),
      footLable: "Last view on: "
    };
  },
  created() {
    eventBus.$on("childSendTime", (transfer) => {
      this.time = transfer.toString().slice(0, 25);
      this.footLable = "Last search on: "
    });
  },
};
</script>

<style scoped>
</style>