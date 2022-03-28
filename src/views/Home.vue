<script setup lang="ts">
import { userStore } from '../stores/user';
import CMetricsBox from '../components/CMetricsBox.vue';
import CInforBox from '../components/CInforBox.vue'
import CContributionsChart from '../components/CContributionsChart.vue'
import CPluginStatic from '../components/CPluginStatic.vue';
import CRepositories from '../components/CRepositories.vue';
import CActivities from '../components/CActivities.vue';
import CTimeLine from '../components/CTimeLine.vue';
import CLoading from '../components/CLoading.vue';

const useUserStore = userStore()

</script>

<template>
    <CLoading v-if="useUserStore.isLoading === true" />
    <div class="home-view" v-if="useUserStore.isLoading === false">
        <div class="statics dark:bg-[#181818] bg-gradient-to-r from-[#5B79A2] to-[#2F456A] py-5">
            <div class="flex justify-center items-start gap-3">
                <CInforBox />
                <CMetricsBox />
            </div>
            <div class="flex justify-center py-10 px-5">
                <CContributionsChart />
            </div>
            <div class="flex justify-center px-5">
                <CPluginStatic />
            </div>
        </div>
        <CRepositories />
        <CActivities />
    </div>
</template>

<style scoped>
/* .home-container .statics > div:nth-child(1) {
    background-image: url("../assets/globe.png");
    background-repeat: no-repeat;
} */

/* ********************* RESPONSIVE *********************/
@media (max-width: 1024px) {
    .statics > div:nth-child(1) {
        display: grid;
        justify-items: end;
    }
}
</style>