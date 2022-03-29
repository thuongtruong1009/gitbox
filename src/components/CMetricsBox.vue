<script setup>
import {reactive, computed} from 'vue'
import { userStore } from '../stores/user';
import IFollower from './icons/IFollower.vue';
import IStars from './icons/IStars.vue';
import IRepos from './icons/IRepos.vue';

const store = userStore()
const starredNumber = reactive([])
const getStarredLength = computed(() =>{
    store.starredData.map((item) => starredNumber.push(item))
    return starredNumber.length
})
</script>

<template>
    <div class="metrics-box-container flex gap-2 w-auto p-1 dark:bg-black">
        <div class="follower cell">
            <IFollower class="w-20" />
            <h2>{{store.userData.followers }}</h2>
            <p>follower</p>
        </div>
         <div class="follower cell">
            <IRepos class="w-20" />
            <h2>{{store.userData.following }}</h2>
            <p>following</p>
        </div>
         <div class="follower cell">
            <IStars class="w-20 my-3" />
            <h2>{{getStarredLength}}</h2>
            <p>stars</p>
        </div>
         <div class="follower cell">
            <IRepos class="w-20" />
            <h2>{{store.userData.public_repos }}</h2>
            <p>repos</p>
        </div>
    </div>
</template>

<style scoped>
.cell{
    border-radius: 0.5rem;
    transition: 0.3s linear;
    padding: 0.5rem;
    width: 7rem;
    max-width: 7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    box-shadow: 2px 2px 4px rgb(75, 75, 75);
    cursor: pointer;
}
.cell:nth-child(1){
    background: #3B5275;
}
.cell:nth-child(2){
    background: #34496A;
}
.cell:nth-child(3){
    background: #304464;
}
.cell:nth-child(4){
    background: #2B3F5F;
}
.cell:hover{
    background: #3B5172;
}
h2{
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
}
p{
    color: #98A4B5;
    font-size: 0.8rem;
}
</style>