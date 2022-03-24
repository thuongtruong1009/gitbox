<script setup lang="ts">
import { computed, ref } from 'vue'
import { activityStore } from '../stores/activity'
import { userStore } from '../stores/user';
import CLoading from '../components/CLoading.vue';
import IPush from '../components/icons/time_line/IPush.vue'
import IPROpen from '../components/icons/time_line/IPROpen.vue';
import IStar from '../components/icons/time_line/IStar.vue';
import IMessage from '../components/icons/time_line/IMessage.vue'
import IWatch from '../components/icons/time_line/IWatch.vue'

const useActivityStore = activityStore()
const userUserStore = userStore()

const getDateItem = (date: any) => (date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())

// const typeEventColor = ref('#28A745')
// function temp(type:any) {
//     if (type === 'PushEvent') {
//         typeEventColor.value = '#1AAB8B'
//     }
//     else if (type === 'PullRequestEvent') {
//         typeEventColor.value = '#28A745'
//     }
//     else if (type === 'StarEvent') {
//         typeEventColor.value = '#8B60ED'
//     }
//     else if (type === 'CreateEvent' || type === 'DeleteEvent' || type === 'IssuesEvent') {
//         typeEventColor.value = '#F19A1A'
//     }
//     return typeEventColor.value
// }

// <h3 class="px-2.75 py-0.75 rounded-2xl w-max text-white text-xs font-medium flex items-center bg-[#8B60ED]" v-if="active.type === 'WatchEvent' || active.type === 'StarEvent'">{{ active.type }}</h3>

</script>

<template>
    <CLoading v-if="userUserStore.isLoading === true" />
    <div
        v-if="userUserStore.isLoading === false"
        class="activities-container flex flex-col justify-center items-center bg-[#F7F8FC] dark:bg-[#181818]"
    >
        <h1 class="my-3 bg-[#56bbe7] text-white py-2 px-7 rounded-md">Recently activities</h1>
        <ul class="sessions">
            <li
                v-for="(active, i) in useActivityStore.activitiesData"
                :key="i"
                class="activity-item relative pl-5 w-276"
            >
                <div class="px-5 pb-5">
                    <div class="bg-white p-5 mb-3 rounded-2xl">
                        <div>
                            <h3
                                class="px-2.75 py-0.75 rounded-2xl w-max text-white text-xs font-medium flex items-center bg-[#28A745]" v-if="active.type === 'PullRequestEvent'"
                            >{{ active.type }}</h3>
                            <h3 class="px-2.75 py-0.75 rounded-2xl w-max text-white text-xs font-medium flex items-center bg-[#1AAB8B]" v-if="active.type === 'PushEvent'">{{ active.type }}</h3>
                            <h3 class="px-2.75 py-0.75 rounded-2xl w-max text-white text-xs font-medium flex items-center bg-[#F19A1A]" v-if="active.type === 'CreateEvent' || active.type === 'DeleteEvent' || active.type === 'IssuesEvent'">{{ active.type }}</h3>
                            <h3 class="px-2.75 py-0.75 rounded-2xl w-max text-white text-xs font-medium flex items-center bg-[#8B60ED]" v-if="active.type === 'WatchEvent' || active.type === 'StarEvent'">{{ active.type }}</h3>
                            <h2 class="my-3 text-lg font-medium">
                                <a
                                    :href="`https://github.com/${active.actor.login}`"
                                    class="text-[#3490DC]"
                                >{{ active.actor.login }}</a>
                                {{ active.type }}
                                <a
                                    :href="`https://github.com/${active.actor.login}${active.repo.name}`"
                                    class="font-normal text-[#3490DC]"
                                >{{ active.repo.name }}</a>
                            </h2>
                        </div>
                        <div class="flex items-start gap-5">
                            <div>
                                <img
                                    :src="active.actor.avatar_url"
                                    alt="avatar"
                                    class="rounded-lg w-18"
                                />
                            </div>
                            <div class="w-full">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <div class="flex items-center gap-3">
                                            <h4 class="text-md font-medium">{{ active.actor.login }}</h4>
                                            <h4
                                                class="rounded-2xl text-xs text-gray-500 px-2 py-0.5 border-1 border-solid border-gray-300 bg-[#F7F7F7]"
                                            >OWNER</h4>
                                        </div>
                                        <p
                                            class="text-gray-400 font-medium"
                                            style="font-size: 0.65em"
                                        >created at {{ getDateItem(new Date(active.created_at)) }}</p>
                                    </div>
                                    <div class="flex gap-2">
                                        <p
                                            v-for="i in 4"
                                            :key="i"
                                            class="rounded-md text-white font-medium py-0.5 px-2 bg-[#78F49A]"
                                            style="font-size: 0.65em"
                                        >JavaScript</p>
                                    </div>
                                </div>
                                <div class="bg-[#F7F8FC] py-3 px-5 rounded-lg mt-4">
                                    <!-- <h4>{{ active.payload.commits.message }}</h4> more PR-->
                                    <h4>Oke</h4>
                                </div>
                            </div>
                        </div>
                        <p class="text-xs mt-3">
                            commit sha:
                            <a
                                href="#"
                                class="text-[#3490DC] underline decoration-gray-400"
                            >123455</a>
                        </p>
                    </div>
                </div>
                <!-- <div class="time-dot absolute top-0 rounded-full bg-[#4e5ed3] border-1 border-solid border-[#4e5ed3] w-4 h-4 -left-2 z-2"></div> -->
                <div
                    class="time-dot absolute top-0 -left-4 z-2 shadow-sm shadow-gray-300 bg-white rounded-full p-2.5 text-lg"
                >
                    <IPush v-if="active.type === 'PushEvent'" />
                    <IPROpen v-if="active.type === 'PullRequestEvent'" />
                    <IStar v-if="active.type === 'StarEvent'" />
                    <IWatch v-if="active.type === 'WatchEvent'" />
                    <IMessage
                        v-if="active.type === 'CreateEvent' || active.type === 'DeleteEvent' || active.type === 'IssuesEvent'"
                    />
                </div>
                <div
                    class="time-line absolute top-0 left-0 w-2 h-full z-1 border-l-1 border-dashed border-l-[#6CB2EB]"
                ></div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
/* .time-table {
    font-family: "Poppins", sans-serif;
} */
</style>