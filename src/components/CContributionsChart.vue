<script setup lang="ts">
import { userStore } from "../stores/user"
const store = userStore()
</script>

<template>
    <div class="contributions-chart bg-white dark:bg-[#181818] dark:text-light-200 text-black p-5 rounded-lg max-w-225 w-225">
        <div class="text-center text-md font-medium">
            <h2>{{store.contributions}} contributions in the last year</h2>
        </div>
        <div class="py-3">
            <img
                :src="`http://ghchart.rshah.org/${store.userName}`"
                alt="contributions-graph"
                class="w-full"
            />
        </div>
        <div class="flex justify-end gap-2 text-xs">
            <p>Less</p>
            <div class="sample flex gap-0.5">
                <span class="bg-[#EBEDF0]"></span>
                <span class="bg-[#9BE9A8]"></span>
                <span class="bg-[#40C463]"></span>
                <span class="bg-[#30A14E]"></span>
                <span class="bg-[#216E39]"></span>
            </div>
            <p>More</p>
        </div>
    </div>
</template>

<style scoped>
.contributions-chart .sample > span{
    display: block;
    width: 1em;
    height: 1em;
    border-radius: 0.25em;
}
</style>