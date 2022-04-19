import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const userStore = defineStore('user', () => {
  const api = "https://api.github.com/users/"
  const userName = ref(`${import.meta.env.VITE_API_USERNAME}`)
  const contributions = ref(2129)

  const isLoading = ref(false)

  const userData = reactive<any>([])
  const orgsData = reactive<any>([])
  const starredData = reactive<any>([])
  const reposData = reactive<any>([])
  const followersData = reactive<any>([])

  return{
    api, userName, contributions, isLoading, userData, orgsData, starredData, reposData, followersData
  }
})