<script setup>
import { computed, ref, reactive } from 'vue';

import { useUser } from '../stores/user'

import CLoading from '../components/CLoading.vue';
import IUserName from '../components/icons/user/IUsername.vue'
import IGithub from '../components/icons/user/IGithub.vue'
import IArrowRight from '../components/icons/user/IArrowRight.vue'

const user = useUser()
const visitProfile = (url) => {
    window.open(url)
}

const getEvenFollow = computed(() => {
    return user.followersData.filter((element, index) => {
        if (index % 2 === 0) {
            return element
        }
    })
})
const getOddFollow = computed(() => {
    return user.followersData.filter((element, index) => {
        if (index % 2 !== 0) {
            return element
        }
    })
})
const printList = computed(() => {
    const result = []
    while (getOddFollow.value.length && getEvenFollow.value.length) {
        result.push(getOddFollow.value.splice(0, 3), getEvenFollow.value.splice(0, 4))
    }
    console.log(result)
    return result
})
</script>

<template>
    <CLoading v-if="user.isLoading === true" />
    <div class="users-container p-8 grid justify-center items-center z-0 dark:bg-black"
        v-if="user.isLoading === false">
        <div class="container pt-5 rounded-lg max-w-2/3 h-min mx-auto bg-[#f7f7f7] dark:bg-gray-800">
            <div
                class="nav text-3xl font-bold flex justify-center items-center py-4 relative bg-green-100 dark:(bg-gray-700 text-white) rounded-b-md -mx-4 mt-3">
                <h1>Followers data list</h1>
            </div>
            <div class="list rounded-lg max-h-screen overflow-y-scroll flex justify-start flex-wrap gap-5 p-3">
                <div class="num relative flex items-center bg-white dark:(bg-gray-700 shadow-gray-600) shadow-md shadow-gray-300/50 hover:shadow-lg rounded-lg cursor-pointer" v-for="(follower, i) in user.followersData" :key="i" @click="visitProfile(follower.html_url)">
                    <img class="w-15 h-15 rounded-full m-2 shadow-md" :src="follower.avatar_url" alt="user_avatar_img">
                    <div class="p-1 font-medium dark:text-white">
                        <div>{{ follower.login }}</div>
                        <p class="text-xs text-gray-500 dark:text-gray-400">ID {{ follower.id }}</p>
                    </div>
                </div>
                <div class="grid items-center">
                    <div class="flex -space-x-4" @click="visitProfile(`https://github.com/${user.userName}?tab=followers`)">
                        <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="">
                        <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="">
                        <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="">
                        <a class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+99</a>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-[#888]" @click="visitProfile(`https://github.com/${user.userName}?tab=followers`)">
                        <p>See more</p>
                        <IArrowRight />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.users-container {
    font-family: "Montserrat", sans-serif;
    min-height: 80vh;
    position: relative;
}

.users-container::before {
    content: '';
    position: absolute;
    background: linear-gradient(to bottom, rgba(50, 150, 100, 0.4), rgba(0, 0, 100, 0));
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.container {
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1;
}

.container .nav {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    font-family: "Tangerine", serif;
}

.container .nav:before,
.container .nav:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: 0;
    border: 0.75rem solid transparent;
    border-bottom: 0.75rem solid #d3d3d3;
    transform-origin: center;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1;
}

.container .nav:before {
    left: 0;
    transform: translateY(-0.45rem) rotate(135deg) translateX(-0.4rem);
}

.container .nav:after {
    right: 0;
    transform: translateY(-0.45rem) rotate(-135deg) translateX(0.4rem);
}

.num {
    counter-increment: list;
}

.num:before {
    content: counter(list);
    position: absolute;
    top: 0;
    z-index: 2;
    left: 5;
    font-size: 0.6rem;
    display: flex;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    color: white;
    background: #ed4264 linear-gradient(to bottom right, #ee9ca7 25%, #ffdde1);
    border-radius: 0 50% 50% 50%;
    shape-outside: ellipse();
}
.user-avatar {
    clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
}
</style>