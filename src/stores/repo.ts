import {defineStore } from 'pinia'
import {reactive, ref} from 'vue'

export const repoStore = defineStore('repo', () =>{
    const topics = reactive([])
    return {topics}
})