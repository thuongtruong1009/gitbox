import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const exploreStore = defineStore('explore', () => {
    const reposTrending = reactive<Object>([])
    return { reposTrending }
})