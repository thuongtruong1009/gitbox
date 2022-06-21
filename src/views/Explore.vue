<script setup>
import { useUser } from '../stores/user';
import { exploreStore } from '../stores/explore'
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
import langColor from '../shared/lang';
import { alphaSort } from '../utils/sort'
import { getDate, getTime } from '../utils/date';

import CLoading from '../components/CLoading.vue';
import IMultiLine from '../components/icons/repos/IMultiLine.vue';
import ISingleLine from '../components/icons/repos/ISingleLine.vue'
import IStar from '../components/icons/repos/IStar.vue'
import IFork from '../components/icons/repos/IFork.vue'
import IDownload from '../components/icons/repos/IDownload.vue';
import IClone from '../components/icons/repos/IClone.vue';
import IGenerate from '../components/icons/repos/IGenerate.vue'
import ISearch from '../components/icons/ISearch.vue';

const user = useUser()
const useExploreStore = exploreStore();
const queryInput = ref("tetris");

const payload = reactive({
    input: 'tetris',
    language: 'assembly',
    sort: 'stars',
    order: 'desc',
    page: 1,
    per_page: 30
})

const search = () => {
    if (queryInput.value) {
        payload.input = queryInput.value;
        user.isLoading = true
    }
    queryInput.value = ""
}
const vFocus = ref()
onMounted(() => {
    vFocus.value.focus()
})

watchEffect(() => {
    const fetchExplore = fetch(`https://api.github.com/search/repositories?q=${payload.input}+language:${payload.language}&sort=${payload.sort}&order=${payload.order}&page=${payload.page}&per_page=${payload.per_page}`).then(res => res.json()).then(data => {
        useExploreStore.reposTrending = data
        user.isLoading = false
    })
})

const filterMode = ref('default')
const reposComputed = computed(() => {
    switch (filterMode.value) {
        case 'most_stars':
            return (useExploreStore.reposTrending.items.sort((a, b) => a.stargazers_count - b.stargazers_count)).reverse();
            break;
        case 'fewest_star':
            return (useExploreStore.reposTrending.items.sort((a, b) => a.stargazers_count - b.stargazers_count));
            break;
        case 'most_fork':
            return (useExploreStore.reposTrending.items.sort((a, b) => a.forks_count - b.forks_count)).reverse();
            break;
        case 'fewest_fork':
            return (useExploreStore.reposTrending.items.sort((a, b) => a.forks_count - b.forks_count));
            break;
        case 'z_a':
            return alphaSort(useExploreStore.reposTrending.items, "name").reverse();
            break;
        default:
            return alphaSort(useExploreStore.reposTrending.items, "name");
            break;
    }
})

const reposVisibleInit = ref(5)
const step = ref(5)
const reposVisibleComputed = computed(() => reposComputed.value.slice(0, reposVisibleInit.value))

</script>

<template>
    <div class="repositories_view p-5 max-w-238 mx-auto dark:bg-black">
        <div class="flex justify-start text-xl font-medium">
            <h1>Repositories</h1>
        </div>
        <div class="filter_tab flex justify-between items-center py-5 w-full">
            <select name="filter" id="filter"
                class="pl-3 py-2 rounded-3xl bg-[#F6F6F6] w-50 max-w-50 text-sm text-[#9595A1] cursor-pointer mr-3"
                v-model="filterMode">
                <option value="default">Default matches</option>
                <option value="most_stars">Most stars</option>
                <option value="fewest_star">Fewest stars</option>
                <option value="most_fork">Most forks</option>
                <option value="fewest_fork">Fewest forks</option>
                <option value="z_a">Alphabet Z to A</option>
            </select>
            <div class="flex items-center gap-5">

                <input type="text" name="search_repos" id="search_repos"
                    class="px-5 rounded-3xl bg-[#F6F6F6] my-0.5 w-70 max-w-70" v-model="queryInput" ref="vFocus"
                    @keyup.enter="search" />
                <div class="rounded-lg bg-[#F6F6F6] cursor-pointer flex justify-center items-center w-10 h-10 text-[#9595A1] hover:text-black"
                    @click="search">
                    <ISearch />
                </div>
            </div>
        </div>
        <CLoading v-if="user.isLoading === true" />
        <div class="repositories_list w-full" v-if="user.isLoading === false">
            <div class="repo relative flex justify-between items-start bg-[#FAFAFA] hover:bg-[#F6F6F6] duration-200 border-1 border-solid border-light-700/50 mt-2 rounded-xl py-2 px-5"
                v-for="trending in reposVisibleComputed" :key="trending.id">
                <div class="flex">
                    <div class="repo_action mr-3">
                        <img :src="trending.owner.avatar_url" alt="repo_img" class="min-w-13 h-13 rounded-full" />
                    </div>
                    <div class="repo_detail">
                        <a :href="trending.html_url">
                            <h2 class="text-lg text-[#0969DA] font-medium">{{ trending.full_name }}</h2>
                        </a>
                        <p class="text-sm font-medium opacity-80 my-3">{{ trending.description }}</p>
                        <div class="flex flex-wrap gap-1 my-2">
                            <p v-for="(topic, i) in trending.topics" :key="i"
                                class="bg-[#DDF4FF] py-1 px-2 text-xs font-medium rounded-xl text-[#0969DA] hover:text-white hover:bg-[#0969DA] cursor-pointer">
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
                <div class="repo_option">
                    <div
                        class="flex justify-end items-end text-sm text-[#9595A1] font-medium gap-3 absolute bottom-3 right-5">
                        <a :href="`${trending.html_url}/archive/HEAD.zip`">
                            <IDownload />
                        </a>
                        <a :href="trending.forks_url">
                            <IClone />
                        </a>
                        <a :href="`${trending.html_url}/generate`">
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
            <div class="loadmore-tab">
                <button class="fill_btn" @click="reposVisibleInit += step"
                    v-if="reposVisibleInit < useExploreStore.reposTrending.items.length">Load more...</button>
            </div>
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
