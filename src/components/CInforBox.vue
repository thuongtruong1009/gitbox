<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUser } from '../stores/user';
import ILink from './icons/other/ILink.vue';
import IGithub from './icons/other/IGithub.vue';
import ITwitter from './icons/other/ITwitter.vue';
import IEmail from './icons/other/IEmail.vue';

const store = useUser()

const getTimeJoined = computed(() => {
    const dateJoin = new Date(store.userData.created_at)
    const dateNow = new Date()
    const diff = dateNow.getFullYear() - dateJoin.getFullYear()
    return diff
})
</script>

<template>
    <div class="infor-box-container flex items-start gap-3">
        <div class="avatar p-2 bg-[#48638A] dark:bg-white/30 w-min rounded-full">
            <img :src="store.userData.avatar_url" alt="avatar" class="max-w-26 rounded-full" />
        </div>
        <div
            class="w-100 rounded-lg bg-[#41587B] dark:bg-white/30 text-white py-3 px-5 shadow-sm shadow-gray-700 m-1"
        >
            <div class="text-lg font-medium flex items-center gap-2">
                <a :href="store.userData.html_url" target="_blank">
                    <h2>{{ store.userData.login }}</h2>
                </a>
                <span class="text-gray-500">&bull;</span>
                <a :href="store.userData.blog" v-if="store.userData.blog" target="_blank">
                    <ILink class="text-gray-400 hover:text-white"/>
                </a>
                <a :href="store.userData.html_url" target="_blank">
                    <IGithub class="text-gray-400 hover:text-white"/>
                </a>
                <a :href="`https://twitter.com/${store.userData.twitter_username}`" v-if="store.userData.twitter_username" target="_blank">
                    <ITwitter class="text-gray-400 hover:text-white"/>
                </a>
                <a :href="`https://twitter.com/${store.userData.twitter_username}`" v-if="store.userData.email" target="_blank">
                    <IEmail class="text-gray-400 hover:text-white"/>
                </a>
            </div>
            <div class="text-xs text-[#98A4B5] py-3">
                <p>{{ store.userData.bio }}</p>
            </div>
            <div class="text-xs font-medium">
                <p>Member since {{ getTimeJoined }} year ago</p>
                <p>{{ store.userData.company }}, {{ store.userData.location }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.infor-box-container > div:hover{
    background: #3B5172;
}
</style>