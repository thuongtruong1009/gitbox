<template>
  <section>
    <a :href="this.author"><img src="../assets/logo.png" /></a>
  </section>
</template>

<script>
export default {
  data() {
    return {
      author: "https://github.com/thuongtruong1009",
    };
  },
};
</script>

<style scoped>
section > a > img {
  position: absolute;
  width: 130px;
  height: 130px;
  top: 0;
  right: 0;
  cursor: pointer;
  filter: hue-rotate(240deg);
}
</style>