<template>
    <div class="about-view-container">
        About
    </div>
</template>

<style scoped>
.about-view-container {
  position: relative;
  background: linear-gradient(120deg, rgba(50, 150, 100, 0.4), rgba(0, 0, 100, 0));
  height: 100vh;
}
.about-view-container:before, .about-view-container:after {
  position: absolute;
  z-index: -1;
  content: " ";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(0deg, rgba(0, 0, 200, 0.4), rgba(0, 0, 200, 0));
}
.about-view-container:after {
  background: linear-gradient(240deg, rgba(150, 50, 50, 0.4), rgba(0, 0, 200, 0));
}
</style>