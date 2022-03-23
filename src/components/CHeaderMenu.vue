<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref } from 'vue'
import { userStore } from "../stores/user";
import ILogo from "./icons/ILogo.vue"
import ISearch from "./icons/ISearch.vue";

import CDarkMode from "@/components/CDarkMode.vue"

const store = userStore()
const getNameInput = ref('')
const saveNameInput = () => {
    if (getNameInput.value) {
        store.isLoading = true
        store.userName = getNameInput.value

        const fetchUser = fetch("https://api.github.com/users/" + getNameInput.value).then((res) => res.json())
        const fetchOrgs = fetch("https://api.github.com/users/" + getNameInput.value + "/orgs").then((res) => res.json())
        const fetchStarred = fetch("https://api.github.com/users/" + getNameInput.value + "/starred").then((res) => res.json())
        const fetchRepos = fetch("https://api.github.com/users/" + getNameInput.value + "/repos").then((res) => res.json())

        const apiData = Promise.all([fetchUser, fetchOrgs, fetchStarred, fetchRepos])
        apiData.then((res) => {
            store.userData = res[0]
            store.orgsData = res[1]
            store.starredData = res[2]
            store.reposData = res[3]
            store.isLoading = false
        })
    }
}

defineProps<{ msg: string }>()
</script>

<template>
    <div
        class="header-container flex justify-between items-center bg-gradient-to-r from-[#5B79A2] to-[#2F456A] px-10 py-4 shadow-md shadow-gray-400"
    >
        <div class="logo text-white cursor-pointer flex items-end gap-2 text-2xl font-semibold">
            <ILogo />
            <h1>{{ msg }}</h1>
        </div>
        <div class="menu-tab flex gap-10 font-medium text-md text-[#98A4B5]">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/repositories">Repositories</RouterLink>
            <RouterLink to="/">Users</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </div>
        <div class="flex items-center gap-3">
            <input
                type="text"
                v-model="getNameInput"
                placeholder="Generate your metrics..."
                class="px-5 text-white rounded-3xl bg-white/10 my-0.5 w-70 max-w-70"
                @click="saveNameInput"
                @keyup.enter="saveNameInput"
            />
            <div
                class="search text-white p-2 rounded-xl bg-white/10 hover:bg-white/30 cursor-pointer"
            >
                <ISearch />
            </div>
            <div class="mode rounded-xl bg-white/10 hover:bg-white/30 cursor-pointer">
                <CDarkMode />
            </div>
        </div>
    </div>
</template>

<style scoped>
.menu-tab > a {
    border-bottom: 3px solid transparent;
    cursor: pointer;
    transition: 0.3s linear;
    padding: 0.5rem 0;
}
.menu-tab > a:hover {
    color: white;
    border-color: white;
}
input::placeholder {
    font-style: italic;
    font-size: 0.8rem;
    color: rgba(168, 168, 168, 0.884);
}
</style>