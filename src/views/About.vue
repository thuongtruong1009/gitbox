<template>
    <div class="about-view-container relative min-h-screen dark:bg-black">
        About
    </div>
</template>

<style scoped>
.about-view-container:before{
    content: '';
    position: absolute;
    background: linear-gradient(to bottom, rgba(50, 150, 100, 0.4), rgba(0, 0, 100, 0));
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
/* .about-view-container:before {
  content: '';
  position: absolute;
  background: linear-gradient(to bottom, rgba(50, 150, 100, 0.4), rgba(0, 0, 100, 0));
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.about-view-container:before, .about-view-container:after {
  position: absolute;
  z-index: -1;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(0deg, rgba(0, 0, 200, 0.4), rgba(0, 0, 200, 0));
}
.about-view-container:after {
  background: linear-gradient(240deg, rgba(150, 50, 50, 0.4), rgba(0, 0, 200, 0));
} */
</style>