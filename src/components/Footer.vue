<template>
  <div class="container">
    <div class="decorate">
      <img
        src="https://media.giphy.com/media/26BREDkItN0Yy3i6Y/giphy.gif"
        width="30px"
        height="30px"
        v-for="index in footerDecorates"
        :key="index"
      />
    </div>
    <p>View on: {{ this.time }}</p>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
export default {
  data() {
    return {
      footerDecorates: Array(36),
      time: new Date(),
    };
  },
  created() {
    eventBus.$on("childSendTime", (transfer) => {
      this.time = transfer;
    });
  },
};
</script>

<style scoped>
.container > p {
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  background: rgba(0, 0, 255, 0.192);
  display: flex;
  justify-content: center;
  align-items: center;
}
.decorate {
  display: flex;
  justify-content: center;
}
</style>
