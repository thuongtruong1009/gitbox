import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const userStore = defineStore('user', () => {
  const userName = ref('')
  const contributions = ref(2129)

  const isLoading = ref(false)

  const userData = reactive<any>([])
  const orgsData = reactive<any>([])
  const starredData = reactive<any>([])
  const reposData = reactive<any>([])

  return{
    userName, contributions, isLoading, userData, orgsData, starredData, reposData
  }
})