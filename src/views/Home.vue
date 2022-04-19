<script setup lang="ts">
import { userStore } from '../stores/user';
import CMetricsBox from '../components/CMetricsBox.vue';
import CInforBox from '../components/CInforBox.vue'
import CContributionsChart from '../components/CContributionsChart.vue'
import CGraphActivities from '../components/CGraphActivities.vue';
import CRepositories from '../components/CRepositories.vue';
import CActivities from '../components/CActivities.vue';
import CTimeLine from '../components/CTimeLine.vue';
import CLoading from '../components/CLoading.vue';

const useUserStore = userStore()

</script>

<template>
    <CLoading v-if="useUserStore.isLoading === true" />
    <div class="home-view" v-if="useUserStore.isLoading === false">
        <div class="statics relative dark:bg-[#181818] bg-gradient-to-r from-[#5B79A2] to-[#2F456A]">
            <div class="flex justify-center items-start gap-3 dark:bg-[#181818] pt-5">
                <CInforBox />
                <CMetricsBox />
            </div>
            <div class="flex justify-center py-10 px-5 dark:bg-[#181818]">
                <CContributionsChart />
            </div>
            <div class="flex justify-center px-5 dark:bg-[#181818] pb-5">
                <CGraphActivities />
            </div>
        </div>
        <CRepositories />
        <CActivities />
    </div>
</template>

<style scoped>
.statics::before{
    content: '';
    position: absolute;
    background-image: url("/img/parallax-0.png");
    background-size: cover;
    background-repeat: no-repeat;
    top: 5;
    left: -45rem;
    width: 100%;
    height: 100%;
}
.statics::after{
    content: '';
    position: absolute;
    background-image: url("/img/parallax-01.png");
    background-repeat: no-repeat;
    background-size: 100%;
    top: 20rem;
    right: -38rem;
    width: 80%;
    height: 80%;
}

/* ********************* RESPONSIVE *********************/
@media (max-width: 1024px) {
    .statics > div:nth-child(1) {
        display: grid;
        justify-items: end;
    }
}
</style>