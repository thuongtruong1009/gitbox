<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import { userStore } from '../stores/user'
import CLoading from '../components/CLoading.vue';
import IUserName from '../components/icons/user/IUsername.vue'
import IGithub from '../components/icons/user/IGithub.vue'

const useUserStore = userStore()

const getEvenFollow = computed(() =>{
    return useUserStore.followersData.filter((element: any, index: any) => {
        if (index % 2 === 0) {
            return element
        }
    })
})
const getOddFollow = computed(() =>{
    return useUserStore.followersData.filter((element: any, index: any) => {
        if (index % 2 !== 0) {
            return element
        }
    })
})

// var a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// while(a.length) {
//     console.log(a.splice(0,3));
// }
</script>

<template>
    <CLoading v-if="useUserStore.isLoading === true" />
    <div class="users-container p-8 grid justify-center items-center z-0 dark:bg-black"
        v-if="useUserStore.isLoading === false">
        <div class="container pt-5 rounded-lg max-w-1/2 h-min">
            <div
                class="nav text-3xl font-bold flex justify-center items-center py-4 relative bg-green-100 rounded-b-md -mx-4 mt-3">
                <h2>Followers data list</h2>
            </div>
            <div class="list rounded-lg max-h-screen overflow-y-scroll flex justify-start flex-wrap gap-1 p-3">
                <div class="num relative dark:text-white cursor-pointer text-right px-5 py-1 rounded-t-l-none rounded-t-r-md rounded-b-l-md rounded-b-r-md"
                    v-for="(follower, i) in getOddFollow" :key="i">

                    <a :href="follower.html_url">
                        <img :src="follower.avatar_url" alt="followers_avatar" class="user-avatar w-18" />
                    </a>

                    <div class>
                        <a :href="follower.html_url">
                            <h3 class="flex items-center gap-1 text-sm text-gray-500 my-1">
                                <IUserName />
                                {{ follower.login }}
                            </h3>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <section>
            <div class="hex_row_odd">
                <div class="center" v-for="(follower, i) in getOddFollow" :key="i">
                    <div class="hexagon">
                        <div class="hex1">
                            <div class="hex2"  :style="`background: url(${follower.avatar_url}) center no-repeat`">
                                <div class="desc">
                                    <h2>Welcome this is an epic title</h2>
                                    <p>{{ follower.login }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="hex_row_even">
                <div class="center" v-for="(follower, i) in getEvenFollow" :key="i">
                    <div class="hexagon">
                        <div class="hex1">
                            <div class="hex2"
                                :style="`background: url(${follower.avatar_url}) center no-repeat`">
                                <div class="desc">
                                    <h2>Welcome this is an epic title</h2>
                                    <p>{{ follower.login }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.users-container {
    font-family: "Montserrat", sans-serif;
    min-height: 80vh;
    position: relative;
}

.users-container::before {
    content: '';
    position: absolute;
    background: linear-gradient(to bottom, rgba(50, 150, 100, 0.4), rgba(0, 0, 100, 0));
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.container {
    background-color: #fff;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1;
}

.container .nav {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    font-family: "Tangerine", serif;
}

.container .nav:before,
.container .nav:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: 0;
    border: 0.75rem solid transparent;
    border-bottom: 0.75rem solid #d3d3d3;
    transform-origin: center;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1;
}

.container .nav:before {
    left: 0;
    transform: translateY(-0.45rem) rotate(135deg) translateX(-0.4rem);
}

.container .nav:after {
    right: 0;
    transform: translateY(-0.45rem) rotate(-135deg) translateX(0.4rem);
}

.num {
    counter-increment: list;
    /* background: #E7DFFC; */
}

.num:before {
    content: counter(list);
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0.6rem;
    display: flex;
    justify-content: center;
    width: 1.2rem;
    height: 1.2rem;
    color: white;
    background: #ed4264 linear-gradient(to bottom right, #ee9ca7 25%, #ffdde1);
    border-radius: 0 50% 50% 50%;
    /* shape-outside: ellipse(); */
}

.user-avatar {
    clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
}

@import url(https://fonts.googleapis.com/css?family=Lato:300);

section {
    margin: 0 auto;
    text-align: center;
    width: 960px;
}

.hex_row_even {
    display: inline-block;
    margin: 0 auto -275px auto;
    overflow: hidden;
}

.hex_row_odd {
    display: inline-block;
    margin: 0 auto -275px auto;
    overflow: hidden;
}

.center {
    float: left;
    margin: 20px 10px;
    width: 220px;
}

.hexagon {
    -moz-transform: rotate(120deg);
    -ms-transform: rotate(120deg);
    -webkit-transform: rotate(120deg);
    transform: rotate(120deg);
    cursor: pointer;
    height: 440px;
    overflow: hidden;
    visibility: hidden;
    width: 220px;
}

.hex1 {
    -moz-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    -webkit-transform: rotate(-60deg);
    transform: rotate(-60deg);
    height: 100%;
    overflow: hidden;
    width: 100%;
}

.hex2 {
    -moz-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    -webkit-transform: rotate(-60deg);
    transform: rotate(-60deg);
    height: 100%;
    position: relative;
    visibility: visible;
    width: 100%;
}

.hex2[style] {
    background-size: cover !important;
}

.desc {
    color: white;
    font-family: 'Lato', sans-serif;
    font-size: 1.5em;
    font-weight: 300;
    height: 440px;
    line-height: 1.5em;
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    visibility: visible;
    width: 220px;
}

.desc.base {
    background: rgba(230, 0, 98, 0.75);
}

.desc.one {
    background: rgba(252, 171, 55, 0.75);
}

.desc.two {
    background: rgba(169, 160, 50, 0.75);
}

.desc.three {
    background: rgba(83, 70, 54, 0.75);
}

.desc h2 {
    margin: 165px 20px 0 20px;
}

.desc p {
    font-size: .5em;
    text-transform: lowercase;
}
</style>