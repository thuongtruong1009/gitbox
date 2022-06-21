<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';

import { useUser } from '../stores/user';
import { useRepo } from '../stores/repo'

import { getDate, getTime } from '../utils/date';
import langColor from '../shared/lang';
import { alphaSort, sizeSort } from '../utils/sort'
import RepoRequest from '../services/repo_request'

import CLoading from '../components/CLoading.vue';
import IMultiLine from '../components/icons/repos/IMultiLine.vue';
import ISingleLine from '../components/icons/repos/ISingleLine.vue'
import IStar from '../components/icons/repos/IStar.vue'
import IFork from '../components/icons/repos/IFork.vue'
import IDownload from '../components/icons/repos/IDownload.vue';
import IClone from '../components/icons/repos/IClone.vue';
import IGenerate from '../components/icons/repos/IGenerate.vue'

const user = useUser()
const repo = useRepo()

onMounted(async()=>{
    const fetchRepo = await RepoRequest.getAllRepos(user.userName)
    repo.reposData = fetchRepo
})

const viewMode = ref('flow')

const filterMode = ref('default')

const reposComputed = computed(() => {
    switch(filterMode.value){
        case 'most_stars':
            return (repo.reposData.sort((a: any, b: any) => a.stargazers_count - b.stargazers_count)).reverse();
            break;
        case 'fewest_star':
            return (repo.reposData.sort((a: any, b: any) => a.stargazers_count - b.stargazers_count));
            break;
        case 'most_fork':
            return (repo.reposData.sort((a: any, b: any) => a.forks_count - b.forks_count)).reverse();
            break;
        case 'fewest_fork':
            return (repo.reposData.sort((a: any, b: any) => a.forks_count - b.forks_count));
            break;
        case 'z_a':
            return alphaSort(repo.reposData, "name").reverse();
            break;
        default:
            return alphaSort(repo.reposData, "name");
            break;
    }
})
const reposVisible = ref(3)
const step = ref(3)
const reposVisibleComputed = computed(() => reposComputed.value.slice(0, reposVisible.value))

</script>

<template>
    <CLoading v-if="user.isLoading === true" />
    <div
        class="repositories_view p-5 max-w-238 mx-auto"
        v-if="user.isLoading === false"
    >
        <div class="flex justify-start text-xl font-medium">
            <h1>Repositories</h1>
        </div>
        <div class="filter_tab flex justify-between items-center py-5 w-full">
            <select
                name="filter"
                id="filter"
                class="pl-3 py-2 rounded-3xl bg-[#F6F6F6] w-50 max-w-50 text-sm text-[#9595A1] cursor-pointer mr-3"
                v-model="filterMode"
            >
                <option value="default" class="accent-green-500/50">Alphabet A to Z</option>
                <option value="z_a">Alphabet Z to A</option>
                <option value="most_stars">Most stars</option>
                <option value="fewest_star">Fewest stars</option>
                <option value="most_fork">Most forks</option>
                <option value="fewest_fork">Fewest forks</option>
            </select>
            <div class="flex items-center gap-2 text-[#9595A1]">
                <div
                    class="rounded-lg cursor-pointer flex justify-center items-center w-9 h-9" @click="viewMode = 'grid'" :class="[viewMode === 'grid' ? 'bg-[#F6F6F6]' : 'bg-transparent']">
                    <ISingleLine />
                </div>
                <div
                    class="rounded-lg cursor-pointer flex justify-center items-center w-9 h-9" @click="viewMode = 'flow'" :class="[viewMode === 'flow' ? 'bg-[#F6F6F6]' : 'bg-transparent']">
                    <IMultiLine />
                </div>
            </div>
        </div>
        <div class="repositories_list w-full" v-if="viewMode === 'flow'">
            <div
                class="repo relative flex justify-between items-start bg-white hover:bg-[#F6F6F6] shadow-md shadow-gray-300/50 duration-200 border-1 border-solid border-[#e9e9e9] mt-2 rounded-xl py-2 px-5"
                v-for="repo in reposVisibleComputed"
                :key="repo.id"
            >
                <div class="flex">
                    <div class="repo_action mr-3">
                        <img
                            :src="repo.owner.avatar_url"
                            alt="repo_img" class="min-w-13 h-13 rounded-full"
                        />
                    </div>
                    <div class="repo_detail">
                        <a :href="repo.html_url">
                            <h2 class="text-lg text-[#0969DA] font-medium">{{ repo.name }}</h2>
                        </a>
                        <p class="text-sm font-medium opacity-80 my-3">{{ repo.description }}</p>
                        <div class="flex flex-wrap gap-1 my-2">
                            <p
                                v-for="(topic, i) in repo.topics"
                                :key="i"
                                class="bg-[#DDF4FF] py-1 px-2 text-xs font-medium rounded-xl text-[#0969DA] hover:text-white hover:bg-[#0969DA] cursor-pointer"
                            >{{ topic }}</p>
                        </div>
                        <p class="flex text-xs font-medium text-gray-400">
                            <span class="repo_license">{{ repo.license?.spdx_id }}</span>
                            <span class="mx-1.5">•</span>
                            <span
                                class="repo_update_time"
                            >Updated {{ getDate(repo.updated_at) }} - {{ getTime(repo.updated_at)}}</span>
                        </p>
                    </div>
                </div>
                <div class="repo_option">
                    <div class="flex text-sm text-[#9595A1] font-medium gap-3">
                        <p class="repo_lang flex items-center gap-1">
                            <span
                                class="lang-icon w-2.5 h-2.5 rounded-full block"
                                :style="{ background: langColor[repo.language] }"
                            ></span>
                            {{ repo.language }}
                        </p>
                        <p class="repo_star flex items-start gap-0.5">
                            <IStar />
                            {{ repo.stargazers_count }}
                        </p>
                        <p class="repo_fork flex items-center gap-0.5">
                            <IFork />
                            {{ repo.forks_count }}
                        </p>
                    </div>
                    <div
                        class="flex justify-end items-end text-sm text-[#9595A1] font-medium gap-3 absolute bottom-3 right-5"
                    >
                        <a :href="`${repo.html_url}/archive/HEAD.zip`">
                            <IDownload />
                        </a>
                        <a :href="repo.forks_url">
                            <IClone />
                        </a>
                        <a :href="`${repo.html_url}/generate`">
                            <IGenerate />
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="viewMode === 'grid'" class="grid grid-cols-2 justify-center items-center gap-5">
            <a
                class="repo"
                v-for="repo in reposComputed"
                :key="repo.id" :href="`${repo.html_url}`" target="_blank" v-cloak
            >
                <img :src="`https://github-readme-stats.vercel.app/api/pin/?username=${user.userName}&repo=${repo.name}`" alt="repo_card" class="shadow-lg shadow-gray-300 rounded-xl hover:shadow-md">
            </a>
        </div>

        <div class="loadmore-tab">
            <button
                class="fill_btn"
                @click="reposVisible += step"
                v-if="reposVisible < reposComputed.length"
            >Load more...</button>
        </div>
    </div>
</template>

<style scoped>
.fill_btn {
    background: none;
    border: 2px solid;
    font: inherit;
    line-height: 1;
    margin-top: 1em;
    padding: 0.5em 1.5em;
    color: #a972cb;
    transition: 0.25s;
    border-radius: 0.5em;
}
.fill_btn:hover {
    border-color: #cb72aa;
    color: #fff;
    box-shadow: inset 0 0 0 2em #cb72aa;
}
</style>
