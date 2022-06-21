import {defineStore } from 'pinia'
import { reactive } from 'vue'

export const useRepo = defineStore('repo', () =>{
    const reposData = reactive<any>([])
    const topics = reactive<any>([])
    return { reposData, topics }
})