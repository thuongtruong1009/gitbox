import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const activityStore = defineStore('activity', () => {
  const activitiesData = reactive<any>([])

  return{
    activitiesData
  }
})