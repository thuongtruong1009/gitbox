<script setup>
import { useUser } from '../../stores/user';
import { exploreStore } from '../../stores/explore'
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
import { alphaSort } from '../../utils/sort'
import { langSearch } from '../../shared/lang'
import { sortRepo } from '../../shared/sort'
import { langColor } from '../../shared/lang';
import { getDate, getTime } from '../../utils/date';
import { download, fork, generate } from '../../shared/action'

import IStar from '../../components/icons/repos/IStar.vue'
import IFork from '../../components/icons/repos/IFork.vue'
import IDownload from '../../components/icons/repos/IDownload.vue';
import IClone from '../../components/icons/repos/IClone.vue';
import IGenerate from '../../components/icons/repos/IGenerate.vue'
import IRepository from '../../components/icons/explore/IRepository.vue'
import IUser from '../../components/icons/explore/IUser.vue'
import IIssue from '../../components/icons/explore/IIssue.vue'
import CLoading from '../../components/CLoading.vue';
import IMultiLine from '../../components/icons/repos/IMultiLine.vue';
import ISingleLine from '../../components/icons/repos/ISingleLine.vue'
import ISearch from '../../components/icons/ISearch.vue';
import IArrowLeft from '../../components/icons/explore/IArrowLeft.vue'
import IArrowRight from '../../components/icons/explore/IArrowRight.vue'
import ITick from '../../components/icons/explore/ITick.vue'

const user = useUser()
const useExploreStore = exploreStore();

const payload = reactive({
    input: 'github',
    language: 'All languages',
    sort: 'stars',
    order: 'desc',
    page: 1,
    per_page: 30,

    filterMode: 'default',
})

const queryInput = ref("github");
const search = () => {
    if (queryInput.value) {
        payload.input = queryInput.value;
    }
    queryInput.value = ""
}
const vFocus = ref()
onMounted(() => {
    vFocus.value.focus()
})

watchEffect(() => {
    user.isLoading = true
    const fetchExplore = fetch(`https://api.github.com/search/repositories?q=${payload.input}+language:${payload.language}&sort=${payload.sort}&order=${payload.order}&page=${payload.page}&per_page=${payload.per_page}`).then(res => res.json()).then(data => {
        useExploreStore.reposSearch = data;
        user.isLoading = false
    })
})

const reposComputed = computed(() => {
    switch (payload.filterMode) {
        case 'most_stars':
            return (useExploreStore.reposSearch.items.sort((a, b) => a.stargazers_count - b.stargazers_count)).reverse();
            break;
        case 'fewest_star':
            return (useExploreStore.reposSearch.items.sort((a, b) => a.stargazers_count - b.stargazers_count));
            break;
        case 'most_fork':
            return (useExploreStore.reposSearch.items.sort((a, b) => a.forks_count - b.forks_count)).reverse();
            break;
        case 'fewest_fork':
            return (useExploreStore.reposSearch.items.sort((a, b) => a.forks_count - b.forks_count));
            break;
        case 'z_a':
            return alphaSort(useExploreStore.reposSearch.items, "name").reverse();
            break;
        default:
            return alphaSort(useExploreStore.reposSearch.items, "name");
            break;
    }
})

const reposVisibleInit = ref(5)
const step = ref(5)
const reposVisibleComputed = computed(() => reposComputed.value.slice(0, reposVisibleInit.value))

const isDropDownLanguague = ref(false)
const searchLanguage = (lang) => {
    isDropDownLanguague.value = !isDropDownLanguague.value
    payload.language = lang
}

const isDropDownSort = ref(false)
const sortRepos = (sort) => {
    isDropDownSort.value = !isDropDownSort.value
    payload.sort = sort
}

</script>

<template>
    <div class="repositories_layout mx-auto dark:bg-black flex justify-center gap-10 p-10">
        <div class="dark:text-gray-200">
            <ul>
                <router-link to="/explore/repositories" router-link-exact-active exact>
                    <li>
                        <IRepository />
                        <h5>Repositories</h5>
                    </li>
                </router-link>
                
                <router-link to="/explore/users">
                    <li>
                        <IUser />
                        <h5>Users</h5>
                    </li>
                </router-link>

                <router-link to="/explore/issues">
                    <li>
                        <IIssue />
                        <h5>Issues</h5>
                    </li>
                </router-link>
            </ul>

            <div class="dropdown_sort relative text-sm mt-24">
                <div class="border-2 border-[#888] rounded-lg bg-[#F3F4F6] dark:bg-gray-700 p-2 cursor-pointer" @click="isDropDownSort = !isDropDownSort">
                    <p>Sort: {{ payload.sort }}</p>
                </div>
                <Transition duration="550" name="nested">
                    <div v-if="isDropDownSort" class="absolute top-12 left-0 bg-white dark:bg-gray-700 rounded-lg z-10 w-full cursor-pointer"  style="max-height: 20rem;">
                        <p v-for="(sort, index) in sortRepo" :key="index" @click="sortRepos(sort)" class="p-2 flex items-center gap-1 hover:bg-[#F3F4F6] dark:hover:bg-blue-gray-600" :class="{'text-red-500 bg-[#F3F4F6] dark:bg-blue-gray-600' : sort === payload.sort}"><ITick class="opacity-0" :class="{'opacity-100' : sort.toLowerCase() === (payload.sort).toLowerCase()}" />{{ sort }}</p>
                    </div>
                </Transition>
            </div>

        
            <div class="dropdown_language relative text-sm mt-5">
                <div class="border-2 border-[#888] rounded-lg bg-[#F3F4F6] dark:bg-gray-700 p-2 cursor-pointer" @click="isDropDownLanguague = !isDropDownLanguague">
                    <p>Language: {{ payload.language }}</p>
                </div>
                <Transition duration="550" name="nested">
                    <div class="absolute top-12 left-0 bg-white dark:bg-gray-700 rounded-lg z-10 overflow-y-scroll w-full cursor-pointer" v-if="isDropDownLanguague" style="max-height: 20rem;">
                        <p v-for="(lang, index) in langSearch" :key="index" @click="searchLanguage(lang)" class="p-2 flex items-center gap-1 hover:bg-[#F3F4F6] dark:hover:bg-blue-gray-600" :class="{'text-red-500 bg-[#F3F4F6] dark:bg-blue-gray-600' : lang === payload.language}"><ITick class="opacity-0" :class="{'opacity-100' : lang.toLowerCase() === (payload.language).toLowerCase()}" />{{ lang }}</p>
                    </div>
                </Transition>
            </div>
        </div>
        

        <div class="repositories_view max-w-238 w-238 dark:bg-black">
            <div class="filter_tab flex justify-between items-center pb-5 w-full">
                <select name="filter" id="filter"
                    class="pl-3 py-2 rounded-3xl bg-[#F6F6F6] dark:bg-gray-700 w-50 max-w-50 text-sm text-[#9595A1] cursor-pointer mr-3"
                    v-model="payload.filterMode">
                    <option value="default">Default matches</option>
                    <option value="most_stars">Most stars</option>
                    <option value="fewest_star">Fewest stars</option>
                    <option value="most_fork">Most forks</option>
                    <option value="fewest_fork">Fewest forks</option>
                    <option value="z_a">Alphabet Z to A</option>
                </select>
                <div class="text-xs text-red-500 font-semibold">
                    <p>{{ useExploreStore.reposSearch.total_count || 0 }} results match.</p>
                </div>
                <div class="flex items-center rounded-3xl p-2 bg-[#F6F6F6] dark:(bg-gray-700 text-white) text-sm">
                    <input type="text"
                        class="px-2 dark:(bg-gray-700 text-white) bg-[#F6F6F6] w-70 max-w-60 placeholder-opacity-50 placeholder-gray-500/50" v-model="queryInput" ref="vFocus"
                        @keyup.enter="search" placeholder="Enter some keywords..." />
                    <div class="dark:bg-gray-700 cursor-pointer flex justify-center items-center w-10 text-[#9595A1] dark:hover:text-white hover:text-black"
                        @click="search">
                        <ISearch />
                    </div>
                </div>
            </div>
            <CLoading v-if="user.isLoading === true" />
            <div class="repositories_list w-full" v-if="user.isLoading === false">
                <div class="repo relative flex justify-between items-start bg-[#FAFAFA] dark:(bg-gray-900 hover:bg-gray-800 border-gray-700 shadow-gray-700) hover:bg-[#F6F6F6] shadow-md shadow-gray-300/50 duration-200 border-1 border-solid border-light-700/50 mt-2 rounded-xl py-2 px-5" v-for="trending in reposVisibleComputed" :key="trending.id">
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
                                <span class="lang-icon w-2.5 h-2.5 rounded-full border-1 shadow-md block"
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

                <div class="flex justify-between items-end py-2">
                    <div class="loadmore-tab">
                        <button class="fill_btn" @click="reposVisibleInit += step"
                            v-if="reposVisibleInit < useExploreStore.reposSearch.items.length">Load more...</button>
                    </div>
                    
                    <div class="flex flex-col items-center">
                        <span class="text-xs text-gray-700 dark:text-gray-400">
                            Showing <span class="font-semibold text-gray-900 dark:text-white">{{ reposVisibleInit }}</span> entries of page <span class="font-semibold text-gray-900 dark:text-white">{{ payload.page }}</span>
                        </span>
                        <div class="inline-flex mt-2 xs:mt-0 gap-1">
                            <button class="inline-flex items-center p-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 dark:(bg-gray-800 border-gray-700 text-gray-400) dark:hover:bg-gray-700 dark:hover:text-white" @click="--payload.page">
                                <IArrowLeft />
                                Prev
                            </button>
                            <button class="inline-flex items-center p-2 text-sm font-medium text-white bg-gray-800 rounded-md border-0 border-l border-gray-700 hover:bg-gray-900 dark:(bg-gray-800 border-gray-700 text-gray-400) dark:hover:bg-gray-700 dark:hover:text-white" @click="++payload.page">
                                Next
                                <IArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
ul li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 1rem;
    font-size: 0.9em;
    padding: 0.5rem 1.5rem;
    margin-bottom: 0.5rem;
    background: #F6F6F6;
    border: 1px solid transparent;
}
ul li:hover,
ul a.router-link-exact-active li,
ul a.router-link-active li{
    background: #ECF3FC;
    border-color: #5CA2F3;
}
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

.fill_btn:hover {
    border-color: #cb72aa;
    color: #fff;
    box-shadow: inset 0 0 0 2em #cb72aa;
}
::-webkit-scrollbar {
    width: 4px;
    border-radius: 2rem;
}
::-webkit-scrollbar-thumb {
    background: #cecece;
}
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
.nested-leave-active {
  transition-delay: 0.1s;
}
.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
