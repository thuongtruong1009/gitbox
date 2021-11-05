<template>
  <section>
    <a :href="this.author"><img src="../assets/logo.png" /></a>
    <div class="nav-side">
      <a href="https://github.com/github.com/thuongtruong1009/">
        <i
          class="fab fa-github-square"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Github profile"
        ></i
      ></a>
      <a href="https://github.com/github.com/thuongtruong1009/">
        <i
          class="far fa-envelope"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Send email"
        ></i
      ></a>
      <a href="https://github.com/github.com/thuongtruong1009/">
        <i
          class="fas fa-exclamation-circle"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Report issues"
        ></i
      ></a>
      <a href="https://github.com/github.com/thuongtruong1009/">
        <i
          class="far fa-comment"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="New discuss"
        ></i
      ></a>
      <a href="https://github.com/github.com/thuongtruong1009/">
        <i
          class="far fa-question-circle"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Pull request"
        ></i
      ></a>
    </div>
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
.nav-side {
  position: absolute;
  top: 40px;
  left: 0;
  display: grid;
  grid-gap: 25px;
  padding: 10px;
  background: rgba(0, 0, 255, 0.226);
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
}
.nav-side > a > i {
  transform: scale(1.4);
  cursor: pointer;
  transition: 0.3s;
  color: rgb(29, 29, 29);
}
.nav-side > a > i:hover {
  transform: scale(1.8);
}
</style>
