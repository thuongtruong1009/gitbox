import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

// export const exploreStore = defineStore('explore', () => {
//     const reposSearch = reactive<any>([])
//     const usersSearch = reactive<any>([])
//     const issuesSearch = reactive<any>([])
//     const limitRepoOwner = ref(10)
//     const limitFollowerOwner = ref(10)

    

//     return { reposSearch, usersSearch, issuesSearch, limitRepoOwner, limitFollowerOwner}
// })

export const exploreStore = defineStore('main', {
    state: () => ({
        reposSearch: reactive<any>([]),
        usersSearch: reactive<any>([]),
        issuesSearch: reactive<any>([]),
        limitRepoOwner: ref(10),
        limitFollowerOwner: ref(10),
        counter: 0,
    }),
    actions: {
      increment() {
        this.counter++
      },
      randomizeCounter() {
        this.counter = Math.round(100 * Math.random())
      },
      changeLimitRepoOwner(quantity:number){
        this.limitRepoOwner = quantity
      }
    },
  })