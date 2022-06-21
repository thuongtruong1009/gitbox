<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CHeaderMenu from "./components/CHeaderMenu.vue";
import CFooter from "./components/CFooter.vue";
import ITop from "./components/icons/ITop.vue"

const isScroll = ref(false)
const scrollToTop = () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}
const scrollFunction = () => {
  const y = window.scrollY
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)
    isScroll.value = true

  else
    isScroll.value = false
}
window.addEventListener('scroll', scrollFunction)
document.addEventListener('contextmenu', event => event.preventDefault());

</script>

<template>
  <div class="relative dark:bg-[#181818]">
    <Transition name="bounce">
      <div v-if="isScroll" id="fcircle"
        class="fixed z-30 w-10 h-10 bottom-5 right-5 bg-[#F48B8A] hover:bg-[#FF5252] text-white rounded-full shadow-md shadow-gray-400 flex justify-center items-center cursor-pointer"
        @click="scrollToTop">
        <ITop />
      </div>
    </Transition>
    <CHeaderMenu msg="Gitbox" />
    <RouterView />
    <CFooter />
  </div>
</template>

<style>
#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
#app::before{
  content: '';
  position: absolute;
  background-image: linear-gradient(to left, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    transform: translateY(2rem);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
    transform: translateY(0);
  }
}
</style>
