import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const exploreStore = defineStore('explore', () => {
    const reposSearch = reactive<any>([])
    const usersSearch = reactive<any>([])
    const issuesSearch = reactive<any>([])
    return { reposSearch, usersSearch, issuesSearch }
})