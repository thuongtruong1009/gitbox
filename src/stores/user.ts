import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const userStore = defineStore('user', () => {
  const userName = ref('')
  const contributions = ref(2129)

  const isLoading = ref(false)

  const userData = reactive([])
  const orgsData = reactive([])
  const starredData = reactive([])
  const reposData = reactive([])

  return{
    userName, contributions, isLoading, userData, orgsData, starredData, reposData
  }
})