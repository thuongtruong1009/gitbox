<script setup lang="ts">
import { computed, ref } from 'vue'
import { userStore } from '../stores/user';
const store = userStore()

const getTimeJoined = computed(() => {
    const dateJoin = new Date(store.userData.created_at)
    const dateNow = new Date()
    const diff = dateNow.getFullYear() - dateJoin.getFullYear()
    return diff
})
</script>

<template>
    <div class="infor-box-container flex items-start gap-3">
        <div class="avatar p-2 bg-[#48638A] w-min rounded-full">
            <img :src="store.userData.avatar_url" alt="avatar" class="max-w-26 rounded-full" />
        </div>
        <div
            class="w-100 rounded-lg bg-[#41587B] text-white py-3 px-5 shadow-sm shadow-gray-700 m-1"
        >
            <div class="text-lg font-medium">
                <a :href="store.userData.html_url">
                    <h2>{{ store.userData.login }}</h2>
                </a>
            </div>
            <div class="text-xs text-[#98A4B5] pb-3">
                <p>{{ store.userData.bio }}</p>
            </div>
            <div class="text-xs font-medium">
                <p>Member since {{ getTimeJoined }} year ago</p>
                <p>{{ store.userData.company }}, {{ store.userData.location }}</p>
            </div>
        </div>
    </div>
</template>