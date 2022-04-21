<script setup lang="ts">
import { ref } from 'vue'
import IGithub from "../components/icons/about/IGithub.vue"
import IDevto from "../components/icons/about/IDevto.vue"
import IGmail from "../components/icons/about/IGmail.vue"
import IInstagram from "../components/icons/about/IInstagram.vue"

const activeTab = ref('author')

const changeTab = (tab: any) => {
  activeTab.value = tab
}

</script>

<template>
  <div class="about-view-container min-h-screen-sm dark:bg-black flex justify-center gap-10 break-words pt-20">
    <div>
      <div class="text-5xl font-semibold flex items-center gap-5 dark:text-light-200">
        <span class="w-3 h-20 bg-[#21EA6E] block rounded-r-lg shadow-md shadow-gray-500/50"></span>
        <h1>About space</h1>
      </div>
      <div class="flex justify-evenly items-center my-5">
        <a href="https://github.com/thuongtruong1009">
          <IGithub />
        </a>
        <a href="https://dev.to/thuongtruong1009">
          <IDevto />
        </a>
        <a href="mailto:ititiu19228@student.hcmiu.edu.vn">
          <IGmail />
        </a>
        <a href="https://instagram.com/thuongtruong1009">
          <IInstagram />
        </a>

      </div>
      <div class="nav flex">
        <p class="border-b-1 border-b-solid border-b-pink-500 w-1/20"></p>
        <a class="text-pink-500 font-medium px-2 py-0.5 rounded-t-md" @click="changeTab('author')"
          :class="{ active: activeTab === 'author' }">Author</a>
        <a class="text-pink-500 font-medium px-2 py-0.5 rounded-t-md" @click="changeTab('features')"
          :class="{ active: activeTab === 'features' }">Features</a>
        <a class="text-pink-500 font-medium px-2 py-0.5 rounded-t-md" @click="changeTab('technologies')"
          :class="{ active: activeTab === 'technologies' }">Technologies</a>
        <p class="border-b-1 border-b-solid border-b-pink-500 w-2/5"></p>
      </div>
      <div class="max-w-md text-gray-500 dark:text-light-500">
        <Transition>
          <div v-if="activeTab === 'author'">
            <h5>&bull; Hi, my name's Tran Nguyen Thuong Truong - frontend developer!</h5>
            <h5>&bull; I am currently working in Ho Chi Minh city - Vietnam.</h5>
          </div>
        </Transition>
        <Transition>
          <div v-if="activeTab === 'features'">
            <h5>&bull; Gitbox is a webapp product created while practicing Vuejs.</h5>
            <h5>&bull; Using the original data from GitHub's restful API through fetching data.</h5>
            <h5>&bull; In this project, i use Vue3 framework using Vite module combined with WindiCSS to speed up the
              build and
              improve the interface.</h5>
            <h5>&bull; Dark/Light mode</h5>
          </div>
        </Transition>
        <Transition>
          <div v-if="activeTab === 'technologies'">
            <h5>&bull; Vuejs 3 (composition API) + ViteJs (latest) + TypeScript (option)</h5>
            <h5>&bull; Vue-Router (v4) + Pinia (TypeScript)</h5>
            <h5>&bull; WindiCSS (migrade from TailwindCSS)</h5>
            <h5>&bull; RESTful API from GitHub</h5>
            <h5>&bull; Enviroment variables mode</h5>
          </div>
        </Transition>
      </div>
    </div>

    <div>
      <img src="https://avatars.githubusercontent.com/u/71834167?v=4" alt="author_avatar_img"
        class="author-avatar max-w-80 max-h-80 shadow-lg shadow-gray-500">
    </div>
  </div>
</template>

<style scoped>
.about-view-container {
  background: linear-gradient(to bottom, rgba(50, 150, 100, 0.4), rgba(0, 0, 100, 0));
}

.nav>a {
  border-bottom: 1px solid rgb(236, 72, 153);
  cursor: pointer;
}

.nav>a.active {
  border: 1px solid rgb(236, 72, 153);
  border-bottom-color: transparent;
}

h5 {
  font-size: 0.9em;
  padding-top: 0.5rem;
}

.author-avatar {
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}

/* *************** TRANSITION ***************** */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.7s ease;
}

.v-enter-from {
  opacity: 0;
}

.v-leave-to {
  display: none;
  ;
}

/* ***************************************** */
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