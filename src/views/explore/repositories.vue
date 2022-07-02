<script setup>
import { langColor } from '../../shared/lang';
import { getDate, getTime } from '../../utils/date';
import { download, fork, generate } from '../../shared/action'

import IStar from '../../components/icons/repos/IStar.vue'
import IFork from '../../components/icons/repos/IFork.vue'
import IDownload from '../../components/icons/repos/IDownload.vue';
import IClone from '../../components/icons/repos/IClone.vue';
import IGenerate from '../../components/icons/repos/IGenerate.vue'

defineProps({
    lists: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <div class="repo relative flex justify-between items-start bg-[#FAFAFA] dark:(bg-gray-900 hover:bg-gray-800 border-gray-700 shadow-gray-700) hover:bg-[#F6F6F6] shadow-md shadow-gray-300/50 duration-200 border-1 border-solid border-light-700/50 mt-2 rounded-xl py-2 px-5"
        v-for="trending in lists" :key="trending.id">
        <div class="flex">
            <div class="repo_avatar mr-3">
                <img :src="trending.owner.avatar_url" alt="repo_img" class="min-w-13 h-13 rounded-full" />
            </div>
            <div class="repo_detail">
                <a :href="trending.html_url">
                    <h2 class="text-lg text-[#0969DA] font-medium">{{ trending.full_name }}</h2>
                </a>
                <p class="text-sm dark:text-orange-500 font-medium opacity-80 my-3">{{ trending.description }}</p>
                <div class="flex flex-wrap gap-1 my-2">
                    <p v-for="(topic, i) in trending.topics" :key="i"
                        class="bg-[#DDF4FF] dark:(bg-gray-700 text-purple-600) py-1 px-2 text-xs font-medium rounded-xl text-[#0969DA] hover:text-white hover:bg-[#0969DA] cursor-pointer">
                        {{ topic }}
                    </p>
                </div>
                <p class="flex text-xs font-medium text-gray-400">
                    <span class="repo_license" v-if="trending.license">
                        <a :href="trending.license.url">{{ trending.license.spdx_id }} license</a>
                        <span class="mx-1.5">•</span>
                    </span>
                    <span class="repo_update_time">Last updated {{ getDate(trending.updated_at) }} - {{ getTime(trending.updated_at)}}</span>
                </p>
            </div>
        </div>
        <div>
            <div
                class="repo_action flex justify-end items-end text-sm font-medium gap-3 absolute bottom-3 right-5">
                <a :href="download(trending.html_url)" target="_blank">
                    <IDownload />
                </a>
                <a :href="fork(trending.html_url)" target="_blank">
                    <IClone />
                </a>
                <a :href="generate(trending.html_url)" target="_blank">
                    <IGenerate />
                </a>
            </div>
            <div class="flex text-sm text-[#9595A1] font-medium gap-3">
                <p class="repo_lang flex items-center gap-1">
                    <span class="lang-icon w-2.5 h-2.5 rounded-full block"
                        :style="{ background: langColor[trending.language] }"></span>
                    {{ trending.language }}
                </p>
                <p class="repo_star flex items-start gap-0.5">
                    <IStar />
                    {{ trending.stargazers_count }}
                </p>
                <p class="repo_fork flex items-center gap-0.5">
                    <IFork />
                    {{ trending.forks_count }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.repo_action{
    color: #9595A1;
    display:none;
}
.repo:hover .repo_action{
    display: flex;
}
.repo_action a {
    color: #9595A1;
}
.repo_action a:hover{
    color:#cb72aa;
}
</style>
