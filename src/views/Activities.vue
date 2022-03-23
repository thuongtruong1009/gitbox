<script setup lang="ts">
import {activityStore} from '../stores/activity'

const useActivityStore = activityStore()

</script>

<template>
    <div
        class="activities-container flex flex-col justify-center items-center bg-[#F7F8FC] dark:bg-[#181818]"
    >
        <h1 class="my-3">Activity</h1>
        <ul class="sessions">
            <li v-for="(active, i) in useActivityStore.activitiesData" :key="i" class="activity-item pl-5 w-276">
                <div class="rounded-2xl bg-white p-5 mb-5">
                    <div>
                        <h3
                            class="px-2.75 py-0.75 bg-[#28A745] rounded-2xl w-max text-white text-xs font-medium flex items-center"
                        >{{ active.type }}</h3>
                        <h2 class="my-3 text-lg font-medium">
                            <a href="#" class="text-[#3490DC]">{{ active.actor.login }}</a> {{ active.type }}
                            <a
                                href="#"
                                class="font-normal text-[#3490DC]"
                            >thuongtruong1009/gitbox</a>
                        </h2>
                    </div>
                    <div class="flex items-start gap-5">
                        <div>
                            <img
                                src="https://avatars.githubusercontent.com/u/71834167?&s=72"
                                alt="avatar"
                                class="rounded-lg"
                            />
                        </div>
                        <div class="w-full">
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="flex items-center gap-3">
                                        <h4 class="text-md font-medium">thuongtruong1009</h4>
                                        <h4
                                            class="rounded-2xl text-xs text-gray-500 px-2 py-0.5 border-1 border-solid border-gray-300 bg-[#F7F7F7]"
                                        >OWNER</h4>
                                    </div>
                                    <p
                                        class="text-gray-400 font-medium"
                                        style="font-size: 0.65em"
                                    >createdAt 4 hours ago</p>
                                </div>
                                <div class="flex gap-2">
                                    <p v-for="i in 4" :key="i" class="rounded-md text-white font-medium py-0.5 px-2 bg-[#78F49A]" style="font-size: 0.65em">JavaScript</p>
                                </div>
                            </div>
                            <div class="bg-[#F7F8FC] py-3 px-5 rounded-lg mt-4">
                                <h4>feat: activities data tab</h4>
                            </div>
                        </div>
                    </div>
                    <p class="text-xs mt-3">
                        commit sha:
                        <a href="" class="text-[#3490DC] underline decoration-gray-400">{{ active.payload.commits[0].sha }}</a>
                    </p>
                </div>
                <div class="time-dot"></div>
                <!-- <div
                    class="time-line absolute top-0 left-0 w-2 h-full z-1 border-l-2 border-dashed border-l-[#6cb2eb]"
                ></div>-->
            </li>
        </ul>
    </div>
</template>

<style scoped>
.time-dot {
    position: absolute;
    top: 0;
    left: -8px;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background: #4e5ed3;
    border: 1px solid #4e5ed3;
    z-index: 2;
}
.time-table {
    font-family: "Poppins", sans-serif;
}
</style>