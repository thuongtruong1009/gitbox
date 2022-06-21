import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useActivity = defineStore('activity', () => {
  const activitiesData = reactive<any>([])

  return{
    activitiesData
  }
})