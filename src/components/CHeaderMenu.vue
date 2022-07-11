<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref, watchEffect } from 'vue'

import { useUser } from "../stores/user";
import { useRepo } from '../stores/repo';

import UserRequest from '../services/user_request'
import OrgRequest from '../services/org_request'
import StarredRequest from '../services/starred_request'

import ILogo from "./icons/ILogo.vue"
import ISearch from "./icons/ISearch.vue";
import IHome from "./icons/header/IHome.vue";
import IRepository from "./icons/header/IRepository.vue";
import IExplore from "./icons/header/IExplore.vue"
import IUsers from "./icons/header/IUsers.vue";
import IAbout from "./icons/header/IContact.vue"

import CDarkMode from "@/components/CDarkMode.vue"

const store = useUser()
const repo = useRepo()

const getNameInput = ref('')
const saveNameInput = () => {
    if (getNameInput.value) {
        store.isLoading = true
        store.userName = getNameInput.value
        getNameInput.value = ''
    }
}
watchEffect(() => {
    store.isLoading = true
    const fetchUser = UserRequest.getUser(store.userName)
    const fetchOrg = OrgRequest.getOrgs(store.userName)
    const fetchStarred = StarredRequest.getAllStarred(store.userName)
    const fetchFollowers = UserRequest.getFollowers(store.userName)

    const apiData = Promise.all([fetchUser, fetchOrg, fetchStarred, fetchFollowers])
    apiData.then((res) => {
        store.userData = res[0]
        store.orgsData = res[1]
        store.starredData = res[2]
        store.followersData = res[3]
        store.isLoading = false

        // console.log(res)
    })
})

defineProps<{ msg: string }>()

const isScroll = ref(false)
const scrollFunction = () => {
    const header = document.getElementById('header')
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)
        header!.classList.add("sticky")

    else
        header!.classList.remove("sticky")
}
window.addEventListener('scroll', scrollFunction)
</script>

<template>
    <section class="header-container flex justify-between items-center bg-gradient-to-r from-[#5B79A2] to-[#2F456A] px-10 py-4 dark:bg-[#181818]"
        id="header">
        <div class="logo text-white cursor-pointer flex items-end gap-2 text-2xl font-semibold">
            <ILogo />
            <h1>{{ msg }}</h1>
        </div>
        <nav class="menu-tab flex gap-10 font-medium text-md text-[#98A4B5]">
            <RouterLink to="/" class="flex items-center gap-1" router-link-exact-active exact><IHome />Home</RouterLink>
            <RouterLink to="/repositories" class="flex items-center gap-1"><IRepository />Repositories</RouterLink>
            <RouterLink to="/users" class="flex items-center gap-1"><IUsers />Users</RouterLink>
            <RouterLink to="/explore/repositories" class="flex items-center gap-1"><IExplore />Explore</RouterLink>
            <RouterLink to="/about" class="flex items-center gap-1"><IAbout />About</RouterLink>
        </nav>
        <div class="flex items-center gap-3">
            <input type="text" v-model="getNameInput" placeholder="Enter your username..."
                class="px-5 py-2 text-white rounded-3xl bg-white/10 my-0.5 w-70 max-w-70" @click="saveNameInput"
                @keyup.enter="saveNameInput" />
            <div class="search text-white p-2 rounded-xl bg-white/10 hover:bg-white/30 cursor-pointer">
                <ISearch />
            </div>
            <div class="mode rounded-xl bg-white/10 hover:bg-white/30 cursor-pointer">
                <CDarkMode />
            </div>
        </div>
    </section>
</template>

<style scoped>
.header-container{
    top: 0;
    left: 0;
    width: 100%;
    transition: 0.4s ease-out;
    z-index: 9;
}
.header-container.sticky {
    opacity: 0.9;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
    padding: 0.8rem 5rem 0.8rem 10rem;
}
.menu-tab>a {
    border-bottom: 3px solid transparent;
    cursor: pointer;
    transition: 0.3s ease-out;
    padding: 0.5rem 0;
}

.menu-tab>a:hover,
.menu-tab>a.router-link-active,
.menu-tab>a.router-link-exact-active  {
    color: white;
}
.menu-tab>a:hover{
    border-color: white;
}

input::placeholder {
    font-style: italic;
    font-size: 0.8rem;
    color: rgba(168, 168, 168, 0.884);
}
</style>
