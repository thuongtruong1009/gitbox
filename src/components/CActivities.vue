<script setup lang="ts">
import { computed, ref } from 'vue'
import { activityStore } from '../stores/activity'
import { userStore } from '../stores/user';
import CLoading from '../components/CLoading.vue';
import ISpan from './icons/time_line/ISpan.vue'
import IPush from './icons/time_line/IPush.vue'
import IPROpen from './icons/time_line/IPROpen.vue';
import IStar from './icons/time_line/IStar.vue';
import IMessage from './icons/time_line/IMessage.vue'
import IWatch from './icons/time_line/IWatch.vue'
import IJoinOrg from './icons/time_line/IJoinOrg.vue';
import IReply from './icons/time_line/IReply.vue';

const useActivityStore = activityStore()
const userUserStore = userStore()

const getDateItem = (date: any) => (date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())

const eventName = (type: any) => (type.replace('Event', '').toLowerCase())

const refactorUrlSpan = (url:any) =>{
    const link = url.replace('api.github.com/repos', 'github.com')
    return link
}

const splitMessages = (message: any) => {
    const split = message.split('*')
    return split
}

const temp = (type: any) => {
    if (type === 'PushEvent') {
        return '#1AAB8B'
    }
    else if (type === 'PullRequestEvent') {
        return '#28A745'
    }
    else if (type === 'StarEvent') {
        return '#8B60ED'
    }
    else if (type === 'CreateEvent' || type === 'DeleteEvent' || type === 'IssuesEvent') {
        return '#F19A1A'
    }
    else {
        return '#28A745'
    }
}

</script>

<template>
    <CLoading v-if="userUserStore.isLoading === true" />
    <div
        v-if="userUserStore.isLoading === false"
        class="activities-container flex flex-col justify-center items-center bg-[#F7F8FC] dark:bg-[#181818]"
    >
        <h1 class="my-3 bg-[#56bbe7] text-white py-2 px-7 rounded-md">Top 30 recently activities</h1>
        <ul class="sessions">
            <li
                v-for="(active, index) in useActivityStore.activitiesData"
                :key="index"
                class="activity-item relative pl-5 w-276"
            >
                <div class="px-5 pb-5">
                    <div class="bg-white p-5 mb-3 rounded-2xl">
                        <div>
                            <div class="flex justify-between">
                                <h3
                                    class="px-2.75 py-0.75 rounded-2xl w-max text-white text-xs font-medium flex items-center"
                                    :class="`bg-[${temp(active.type)}]`"
                                >{{ eventName(active.type) }}</h3>
                                <a :href="refactorUrlSpan(active.payload.commits[0].url)" v-if="active.payload.commits">
                                    <ISpan class="cursor-pointer text-gray-500 hover:text-gray-700" />
                                </a>
                            </div>
                            <h2 class="my-3 text-lg font-medium">
                                <a
                                    :href="`https://github.com/${active.actor.login}`"
                                    class="text-[#3490DC]"
                                >{{ active.actor.login }}</a>
                                {{ eventName(active.type) }}
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
                                    <div
                                        class="flex gap-2"
                                        v-if="active.payload.pull_request && active.payload.pull_request.labels"
                                    >
                                        <p
                                            v-for="(label, i) in active.payload.pull_request.labels"
                                            :key="i"
                                            class="rounded-md text-white font-medium py-0.5 px-2"
                                            :class="`bg-[#${label.color}]`"
                                            style="font-size: 0.65em"
                                        >{{ label.name }}</p>
                                    </div>
                                </div>
                                <div class="mt-4" v-if="active.payload.commits">
                                    <ul
                                        v-for="(message, i) in splitMessages(active.payload.commits[0].message)"
                                        :key="i"
                                        class="first:bg-[#F7F8FC] first:py-3 py-1 px-5 rounded-lg mt-2 not-first:list-circle list-inside text-sm text-black font-medium"
                                    >
                                        <li>{{ message }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p class="text-xs mt-3" v-if="active.payload.commits">
                            commit sha:
                            <a
                                href="#"
                                class="text-[#3490DC] underline decoration-gray-400"
                            >{{ active.payload.commits[0].sha }}</a>
                        </p>
                    </div>
                </div>
                <div
                    class="time-dot absolute top-0 -left-4.5 z-2 shadow-md shadow-gray-200 bg-white rounded-full flex justify-center items-center w-10 h-10 text-lg"
                >
                    <IPush v-if="active.type === 'PushEvent'" />
                    <IPROpen v-if="active.type === 'PullRequestEvent'" />
                    <IStar v-if="active.type === 'WatchEvent'" />
                    <IWatch v-if="active.type === 'PullRequestReviewEvent'" />
                    <IMessage
                        v-if="active.type === 'CreateEvent' || active.type === 'DeleteEvent' || active.type === 'IssuesEvent'"
                    />
                    <IReply
                        v-if="active.type === 'IssueCommentEvent' || active.type === 'PullRequestReviewCommentEvent'"
                    />
                    <IJoinOrg v-if="active.type === 'MemberEvent'" />
                </div>
                <div
                    class="time-line absolute top-0 left-0 w-2 h-full z-1 border-l-1 border-dashed border-l-[#6CB2EB]"
                ></div>
            </li>
        </ul>
    </div>
</template>
