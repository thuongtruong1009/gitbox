<template>
  <section>
    <a :href="this.github"><img src="../assets/logo.png" /></a>
    <div class="nav-side">
      <a :href="this.email">
        <i
          class="far fa-envelope"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Send email"
        ></i
      ></a>
      <a :href="this.issue">
        <i
          class="fas fa-exclamation-circle"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Report issues"
        ></i
      ></a>
      <a :href="this.discuss">
        <i
          class="far fa-comment"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="New discuss"
        ></i
      ></a>
      <a :href="this.request">
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
      github: "https://github.com/thuongtruong1009",
      email: "mailto:ititiu19228@student.hcmiu.edu.vn",
      issue: "https://github.com/thuongtruong1009/Snake-Game-OOP/issues",
      discuss: "https://github.com/thuongtruong1009/Snake-Game-OOP/discuss",
      request: "https://github.com/thuongtruong1009/Snake-Game-OOP/pulls",
    };
  },
};
</script>

<style scoped>
section > a > img {
  position: fixed;
  width: 130px;
  height: 130px;
  top: 0;
  right: 0;
  cursor: pointer;
  filter: hue-rotate(240deg);
}
.nav-side {
  position: fixed;
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
