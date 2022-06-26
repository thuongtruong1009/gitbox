<script setup>
import { useUser } from '../stores/user';
import { exploreStore } from '../stores/explore'
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
import { alphaSort } from '../utils/sort'

import IRepository from '../components/icons/explore/IRepository.vue'
import IUser from '../components/icons/explore/IUser.vue'
import IIssue from '../components/icons/explore/IIssue.vue'
import CLoading from '../components/CLoading.vue';
import IMultiLine from '../components/icons/repos/IMultiLine.vue';
import ISingleLine from '../components/icons/repos/ISingleLine.vue'
import ISearch from '../components/icons/ISearch.vue';
import IArrowLeft from '../components/icons/explore/IArrowLeft.vue'
import IArrowRight from '../components/icons/explore/IArrowRight.vue'

const user = useUser()
const useExploreStore = exploreStore();

const payload = reactive({
    input: 'tetris',
    language: 'assembly',
    sort: 'stars',
    order: 'desc',
    page: 1,
    per_page: 30,

    searchNumber: 0,
    searchType: 'repositories',
    hasFilter: true,
    filterMode: 'default',
})

const queryInput = ref("tetris");
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
    if(payload.searchNumber === 0){
        payload.hasFilter = true;
            payload.searchType = 'repositories';
    }
    if(payload.searchNumber === 1){
            payload.hasFilter = false;
            payload.searchType = 'users';
    }
    if(payload.searchNumber === 2){
        payload.hasFilter = false;
        payload.searchType = 'issues';
    }
})


watchEffect(() => {
    user.isLoading = true
    const fetchExplore = fetch(`https://api.github.com/search/${payload.searchType}?q=${payload.input}+language:${payload.language}&sort=${payload.sort}&order=${payload.order}&page=${payload.page}&per_page=${payload.per_page}`).then(res => res.json()).then(data => {
        useExploreStore.reposTrending = data
        user.isLoading = false
    })
})

const reposComputed = computed(() => {
    switch (payload.filterMode) {
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
    <div class="repositories_layout mx-auto dark:bg-black flex justify-center gap-10 p-10">
        <div>
            <ul>
                <router-link to="/explore/repositories" router-link-exact-active exact @click="searchNumber = 0">
                    <li>
                        <IRepository />
                        <h5>Repositories</h5>
                    </li>
                </router-link>
                
                <router-link to="/explore/users" @click="searchNumber = 1">
                    <li>
                        <IUser />
                        <h5>Users</h5>
                    </li>
                </router-link>

                <router-link to="/explore/issues" @click="searchNumber = 2">
                    <li>
                        <IIssue />
                        <h5>Issues</h5>
                    </li>
                </router-link>
            </ul>
        </div>

        <div class="repositories_view max-w-238 w-238 dark:bg-black">
            <div class="filter_tab flex justify-between items-center pb-5 w-full">
                <select name="filter" id="filter"
                    class="pl-3 py-2 rounded-3xl bg-[#F6F6F6] dark:bg-gray-700 w-50 max-w-50 text-sm text-[#9595A1] cursor-pointer mr-3"
                    v-model="payload.filterMode" v-if="payload.hasFilter">
                    <option value="default">Default matches</option>
                    <option value="most_stars">Most stars</option>
                    <option value="fewest_star">Fewest stars</option>
                    <option value="most_fork">Most forks</option>
                    <option value="fewest_fork">Fewest forks</option>
                    <option value="z_a">Alphabet Z to A</option>
                </select>
                <div class="text-xs text-red-500 font-semibold">
                    <p>{{ useExploreStore.reposTrending.total_count }} results match.</p>
                </div>
                <div class="flex items-center gap-5">
                    <input type="text" name="search_repos" id="search_repos"
                        class="px-5 rounded-3xl bg-[#F6F6F6] dark:(bg-gray-700 text-white) my-0.5 w-70 max-w-70 placeholder-opacity-50" v-model="queryInput" ref="vFocus"
                        @keyup.enter="search" placeholder="Enter some keywords..." />
                    <div class="rounded-lg bg-[#F6F6F6] dark:bg-gray-700 cursor-pointer flex justify-center items-center w-10 h-10 text-[#9595A1] hover:text-black"
                        @click="search">
                        <ISearch />
                    </div>
                </div>
            </div>
            <CLoading v-if="user.isLoading === true" />
            <div class="repositories_list w-full" v-if="user.isLoading === false">

                <router-view :lists="reposVisibleComputed"></router-view>

                <div class="flex justify-between items-end py-2">
                    <div class="loadmore-tab">
                        <button class="fill_btn" @click="reposVisibleInit += step"
                            v-if="reposVisibleInit < useExploreStore.reposTrending.items.length">Load more...</button>
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

.fill_btn:hover {
    border-color: #cb72aa;
    color: #fff;
    box-shadow: inset 0 0 0 2em #cb72aa;
}
</style>
