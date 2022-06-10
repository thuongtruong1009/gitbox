<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import { useUser } from '../stores/user'
import CLoading from '../components/CLoading.vue';
import IUserName from '../components/icons/user/IUsername.vue'
import IGithub from '../components/icons/user/IGithub.vue'

const user = useUser()

const getEvenFollow = computed(() => {
    return user.followersData.filter((element: any, index: any) => {
        if (index % 2 === 0) {
            return element
        }
    })
})
const getOddFollow = computed(() => {
    return user.followersData.filter((element: any, index: any) => {
        if (index % 2 !== 0) {
            return element
        }
    })
})
const printList = computed(() => {
    const result = []
    while (getOddFollow.value.length && getEvenFollow.value.length) {
        result.push(getOddFollow.value.splice(0, 3), getEvenFollow.value.splice(0, 4))
    }
    console.log(result)
    return result
})
</script>

<template>
    <CLoading v-if="user.isLoading === true" />
    <div class="users-container p-8 grid justify-center items-center z-0 dark:bg-black"
        v-if="user.isLoading === false">
        <div class="container pt-5 rounded-lg max-w-1/2 h-min mx-auto">
            <div
                class="nav text-3xl font-bold flex justify-center items-center py-4 relative bg-green-100 rounded-b-md -mx-4 mt-3">
                <h2>Followers data list</h2>
            </div>
            <div class="list rounded-lg max-h-screen overflow-y-scroll flex justify-center flex-wrap gap-5 p-3">
                <div class="num relative dark:text-white cursor-pointer text-right rounded-t-l-none rounded-t-r-md rounded-b-l-md rounded-b-r-md"
                    v-for="(follower, i) in user.followersData" :key="i">

                    <a :href="follower.html_url" class="">
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

        <div class="mb-30">
            <section v-for="(items, i) in printList" :key="i">
                <div v-if="i % 2 === 0">
                    <div class="hex_row_odd" v-for="(item, index) in items" :key="index">
                        <div class="center">
                            <div class="hexagon">
                                <div class="hex1">
                                    <div class="hex2" :style="`background: url(${item.avatar_url}) center no-repeat`">
                                        <div class="desc opacity-0 duration-200 grid gap-5 justify-center content-center text-white text-2xl left-1/3 top-[45%] absolute text-center font-medium w-auto h-auto">
                                            <h2>{{ item.login }}</h2>
                                            <a :href="item.html_url" class="flex items-start gap-1 text-xs">
                                                <IUserName />
                                                <p>{{ item.login }}</p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="hex_row_even"  v-for="(item, index) in items" :key="index">
                    <div v-if="i % 2 !== 0">
                        <div class="center">
                            <div class="hexagon">
                                <div class="hex1">
                                    <div class="hex2" :style="`background: url(${item.avatar_url}) center no-repeat`">
                                        <div class="desc opacity-0 duration-200 grid gap-5 justify-center content-center text-white text-2xl left-1/3 top-[45%] absolute text-center font-medium w-auto h-auto">
                                            <h2>{{ item.login }}</h2>
                                            <a :href="item.html_url" class="flex items-start gap-1 text-xs">
                                                <IUserName />
                                                <p>{{ item.login }}</p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
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
    z-index: 2;
    left: 5;
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
    clip-path: polygon(0 0, 67% 0, 100% 20%, 100% 80%, 68% 100%, 29% 100%, 0% 80%, 0% 20%);
}
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
    margin: 0 auto -300px auto;
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
.hex2:hover .desc{
    opacity: 1;
}
.hex2[style] {
    background-size: cover !important;
}
.hex_row_odd:hover .hex2:before,
.hex_row_even:hover .hex2:before {
    content: 'edede';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 3s linear;
}
.hex_row_odd:nth-child(1):hover .hex2:before,
.hex_row_even:nth-child(1):hover .hex2:before {
    background: #e60062bf;
}
.hex_row_odd:nth-child(2):hover .hex2:before,
.hex_row_even:nth-child(2):hover .hex2:before {
background: rgba(252, 171, 55, 0.75);
    background-size: 100% 100%;
}
.hex_row_odd:nth-child(3):hover .hex2:before,
.hex_row_even:nth-child(3):hover .hex2:before  {
    background: rgba(169, 160, 50, 0.75);
}
.hex_row_odd:nth-child(4):hover .hex2:before,
.hex_row_even:nth-child(4):hover .hex2:before{
    background: rgba(83, 70, 54, 0.75);
}
/* .desc h2 {
    margin: 165px 20px 0 20px;
} */
</style>