<script setup lang="ts">
import CMetricsBox from '../components/CMetricsBox.vue';
import CInforBox from '../components/CInforBox.vue'
import CContributionsChart from '../components/CContributionsChart.vue'
import CPluginStatic from '../components/CPluginStatic.vue';
</script>

<template>
    <div class="home-view">
        <div class="statics bg-gradient-to-r from-[#5B79A2] to-[#2F456A] p-5">
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
    </div>
</template>

<style scoped>
/* .home-container .statics > div:nth-child(1) {
    background-image: url("../assets/globe.png");
    background-repeat: no-repeat;
} */
/* ********************* RESPONSIVE *********************/
@media (max-width:1024px) {
    .statics > div:nth-child(1){
        display: grid;
        justify-items: end;
    }
}
</style>