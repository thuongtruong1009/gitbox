<script setup lang="ts">
import { userStore } from '../stores/user';
import { computed, ref } from 'vue';
import langColor from '../shared/lang';
import { alphaSort } from '../shared/sort'
import CLoading from '../components/CLoading.vue';
import IMultiLine from './icons/repos/IMultiLine.vue';
import ISingleLine from './icons/repos/ISingleLine.vue'
import IStar from './icons/repos/IStar.vue'
import IFork from './icons/repos/IFork.vue'
import IDownload from './icons/repos/IDownload.vue';
import IClone from './icons/repos/IClone.vue';
import IGenerate from './icons/repos/IGenerate.vue'

const store = userStore()

const filterMode = ref('default')
const reposComputed = computed(() => {
    if (filterMode.value === 'default') {
        return alphaSort(store.reposData, "name");
    }
    else if (filterMode.value === 'most_stars') {
        return (store.reposData.sort((a: any, b: any) => a.stargazers_count - b.stargazers_count)).reverse();
    }
    else if (filterMode.value === 'fewest_star') {
        return (store.reposData.sort((a: any, b: any) => a.stargazers_count - b.stargazers_count));
    }
    else if (filterMode.value === 'most_fork') {
        return (store.reposData.sort((a: any, b: any) => a.forks_count - b.forks_count)).reverse();
    }
    else if (filterMode.value === 'fewest_fork') {
        return (store.reposData.sort((a: any, b: any) => a.forks_count - b.forks_count));
    }
    else if (filterMode.value === 'z_a') {
        return alphaSort(store.reposData, "name").reverse();
    }
})
const reposVisible = ref(3)
const step = ref(3)
const reposVisibleComputed = computed(() => reposComputed.value.slice(0, reposVisible.value))
</script>

<template>
    <CLoading v-if="store.isLoading === true" />
    <div
        class="repositories_view p-5 max-w-238 mx-auto dark:bg-black"
        v-if="store.isLoading === false"
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
                <option value="default">Default matches</option>
                <option value="most_stars">Most stars</option>
                <option value="fewest_star">Fewest stars</option>
                <option value="most_fork">Most forks</option>
                <option value="fewest_fork">Fewest forks</option>
                <option value="z_a">Alphabet Z to A</option>
            </select>
            <div class="flex items-center gap-2 text-[#9595A1]">
                <div
                    class="rounded-lg active:bg-[#F6F6F6] cursor-pointer flex justify-center items-center w-9 h-9"
                >
                    <ISingleLine />
                </div>
                <div
                    class="rounded-lg bg-[#F6F6F6] cursor-pointer flex justify-center items-center w-9 h-9"
                >
                    <IMultiLine />
                </div>
            </div>
        </div>
        <div class="repositories_list w-full">
            <div
                class="repo flex justify-between items-start bg-[#F6F6F6] border-1 border-solid border-light-700/50 mt-2 rounded-xl py-2 px-5"
                v-for="repo in reposVisibleComputed"
                :key="repo.id"
            >
                <div class="flex">
                    <div class="repo_action mr-3">
                        <img
                            src="https://avatars.githubusercontent.com/u/9950313?v=4&s=52"
                            alt="repo_img"
                        />
                    </div>
                    <div class="repo_detail">
                        <h2 class="text-lg text-[#328AF1] font-medium">{{ repo.name }}</h2>
                        <p class="text-sm font-medium opacity-80 my-3">{{ repo.description }}</p>
                        <p class="flex text-xs font-medium text-gray-400">
                            <span class="repo_license">{{ repo.license }}</span>
                            <span class="mx-1.5">•</span>
                            <span class="repo_update_time">Updated 45 minutes ago</span>
                        </p>
                    </div>
                </div>
                <div class="repo_option grid gap-10">
                    <div class="flex text-sm text-[#9595A1] font-medium gap-3">
                        <p class="repo_lang flex items-center gap-1">
                            <span
                                class="lang-icon w-2 h-2 rounded-full"
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
                        class="flex justify-end items-end text-sm text-[#9595A1] font-medium gap-3"
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
