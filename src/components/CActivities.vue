<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { useActivity } from '../stores/activity'
import { useUser } from '../stores/user';
import { getDate, getTime } from '../utils/date';

import EventRequest from '../services/event_request';

import CLoading from '../components/CLoading.vue';

import ISpan from './icons/time_line/ISpan.vue'
import IPush from './icons/time_line/IPush.vue'
import IPROpen from './icons/time_line/IPROpen.vue';
import IStar from './icons/time_line/IStar.vue';
import IMessage from './icons/time_line/IMessage.vue'
import IWatch from './icons/time_line/IWatch.vue'
import IJoinOrg from './icons/time_line/IJoinOrg.vue';
import IReply from './icons/time_line/IReply.vue';
import IRelease from './icons/time_line/IRelease.vue';
import ILPush from './icons/time_line/label_type/ILPush.vue';

const activity = useActivity()
const user = useUser()

onMounted(async()=>{
    const fetchEvent = await EventRequest.getPublicEvents(user.userName)
    activity.activitiesData = fetchEvent
})

const getCommits = (array: any, item: any) => {
    return array.filter((item:any) => Object.keys(array) === item)
}

const getDateItem = (date: any) => (date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())

const eventName = (type: any) => (type.replace('Event', '').toLowerCase())

const refactorUrlSpan = (url: String) => {
    if(url){
        const link = url.replace(/api.github.com\/repos/, 'github.com')
        return link
    }
}

const temp = (type: string) => {
    if (type === 'PushEvent') {
        return '#1AAB8B'
    }
    if (type === 'PullRequestEvent') {
        return '#28A745'
    }
    if (type === 'WatchEvent' || type === 'StarEvent') {
        return '#8B60ED'
    }
    if (type === 'CreateEvent' || type === 'IssuesEvent') {
        return '#F19A1A'
    }
    if (type === "DeleteEvent") {
        return "#EC454F"
    }
    if (type === 'ReleaseEvent') {
        return '#8795A1'
    }
    return '#28A745'
}

</script>

<template>
    <CLoading v-if="user.isLoading === true" />
    <div v-if="user.isLoading === false"
        class="activities-container flex flex-col justify-center items-center">
        <h1 class="my-3 bg-[#56bbe7] text-white py-2 px-7 rounded-md">Top 30 recently activities</h1>
        <ul class="sessions">
            <li v-for="(active, index) in activity.activitiesData" :key="index"
                class="activity-item relative pl-5 w-276">
                <div class="px-5 pb-5">
                    <div class="bg-white dark:bg-[#1E293B] p-5 rounded-2xl shadow-md shadow-gray-300/50 dark:shadow-gray-700 border-1 border-[#e9e9e9] dark:border-gray-600">
                        <div>
                            <div class="flex justify-between">
                                <h3 class="px-2.75 py-0.75 rounded-2xl w-max text-white text-xs font-medium flex items-center"
                                    :class="`bg-[${temp(active.type)}]`">{{ eventName(active.type) }}</h3>
                                <a :href="refactorUrlSpan(active.payload.commits[0]?.url)" v-if="active.payload.commits">
                                    <ISpan class="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-light-500" />
                                </a>
                            </div>
                            <h2 class="my-3 text-lg font-medium dark:text-[#D05E25]">
                                <a :href="`https://github.com/${active.actor.login}`" class="text-[#3490DC]">{{
                                    active.actor.login
                                }}</a>
                                {{ eventName(active.type) }}
                                <a :href="`https://github.com/${active.repo.name}`"
                                    class="font-normal text-[#3490DC] dark:text-[#A78BFA]">{{ active.repo.name }}</a>
                            </h2>
                        </div>
                        <div class="flex items-start gap-5">
                            <div>
                                <img :src="active.actor.avatar_url" alt="avatar" class="rounded-lg w-18" />
                            </div>
                            <div class="w-full">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <div class="flex items-center gap-3">
                                            <h4 class="text-md font-medium dark:text-[#3490DC]">{{ active.actor.login }}</h4>
                                            <h4
                                                class="rounded-2xl text-xs text-gray-500 px-2 py-0.5 border-1 border-solid border-gray-300 dark:border-none dark:text-[#0F9669] bg-[#F7F7F7] dark:bg-[#1C4C6E]">
                                                OWNER</h4>
                                        </div>
                                        <p class="text-gray-400 font-medium" style="font-size: 0.65em">created at {{ getDate(active.created_at) }} - {{ getTime(active.created_at)}}</p>
                                    </div>
                                    <div class="flex gap-2"
                                        v-if="active.payload.pull_request && active.payload.pull_request.labels[0]">
                                        <p v-for="(label, i) in active.payload.pull_request.labels" :key="i"
                                            class="rounded-md text-white font-medium py-0.5 px-2"
                                            :class="`bg-[#${label.color}]`" style="font-size: 0.65em">{{ label.name }}
                                        </p>
                                    </div>
                                </div>
                                <div class="mt-4" v-if="active.payload.commits">
                                    <ul v-for="(message, i) in (active.payload.commits[0]?.message.replace('\n\n', '\n').replace('\r\n\r\n', '\r\n').split('\n'))"
                                        :key="i"
                                        class="first:bg-[#F7F8FC] first:dark:text-[#E76DAE] first:py-3 dark:bg-[#283447] dark:text-[#8E9DB2] first:text-red-500 py-1 px-5 rounded-lg mt-2 not-first:list-circle not-first:ml-7 list-inside text-sm text-black font-medium">
                                        <li>{{ message }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p class="text-xs mt-3" v-if="active.payload.commits">
                            commit sha:
                            <a :href="active.payload.commits[0]?.url.replace('api.github.com/repos', 'github.com')" class="text-[#3490DC] underline decoration-gray-400">
                                {{ active.payload.commits[0]?.sha }}
                            </a>
                        </p>
                    </div>
                </div>
                <div
                    class="time-dot absolute top-0 -left-4.5 z-2 shadow-md shadow-gray-300 bg-white dark:bg-[#192F51] dark:shadow-gray-600 rounded-full flex justify-center items-center w-10 h-10 text-lg dark:text-[#8E9DB2]">
                    <IPush v-if="active.type === 'PushEvent'" />
                    <IPROpen v-if="active.type === 'PullRequestEvent'" />
                    <IStar v-if="active.type === 'WatchEvent'" />
                    <IWatch v-if="active.type === 'PullRequestReviewEvent'" />
                    <IMessage
                        v-if="active.type === 'CreateEvent' || active.type === 'DeleteEvent' || active.type === 'IssuesEvent'" />
                    <IReply
                        v-if="active.type === 'IssueCommentEvent' || active.type === 'PullRequestReviewCommentEvent'" />
                    <IJoinOrg v-if="active.type === 'MemberEvent'" />
                    <IRelease v-if="active.type === 'ReleaseEvent'" />
                </div>
                <div class="time-line absolute top-0 left-0 w-2 h-full z-1 border-l-1 border-dashed border-l-[#6CB2EB]">
                </div>
            </li>
        </ul>
    </div>
</template>