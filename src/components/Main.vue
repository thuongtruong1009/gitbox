<template>
    <div class="container py-3">
        <form
            @submit.prevent="onSubmit"
            class="d-flex justify-content-center align-items-center gap-3 my-3 ml-3"
        >
            <input
                class="form-control rounded"
                type="search"
                v-model="name"
                v-on:keydown.enter="onSubmit"
                name="name"
                placeholder="typing Github @username..."
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'typing Github @username...'"
            />
            <img src="assets/git.png" @click="onSubmit" />
        </form>

        <p class="loading" v-if="isLoading">Not found GitHub profile for "{{ name }}"...</p>
        <div class="main" v-if="result">
            <div class="main-avatar">
                <img :src="result.avatar_url" />
                <h1>{{ result.name }}</h1>
                <a href="result.html_url">
                    <h4>@{{ result.login }}</h4>
                </a>
            </div>
            <div class="main-infor">
                <div class="main-infor-statical">
                    <div>
                        <h1 @click="modalOpen = true"><ion-icon name="people-outline"></ion-icon> Followers</h1>
                        <h2>{{ result.followers }}</h2>
                    </div>
                    <div>
                        <h1><ion-icon name="person-add-outline"></ion-icon> Following</h1>
                        <h2>{{ result.following }}</h2>
                    </div>
                    <div>
                        <h1><ion-icon name="folder-open-outline"></ion-icon> Repository</h1>
                        <h2>{{ result.public_repos }}</h2>
                    </div>
                    <div>
                        <h1><ion-icon name="star-outline"></ion-icon> Star</h1>
                        <h2>{{ this.stars.length }}</h2>
                    </div>
                    <div>
                        <h1><ion-icon name="git-network-outline"></ion-icon> Gist</h1>
                        <h2>{{ result.public_gists }}</h2>
                    </div>
                </div>
                <div class="main-infor-label">
                    <h5><span><ion-icon name="eye-outline"></ion-icon> Bio:</span>{{ result.bio }}</h5>
                    <h5>
                        <span><ion-icon name="home-outline"></ion-icon> Company:</span>
                        {{ result.company }}
                    </h5>
                    <h5>
                        <span><ion-icon name="location-outline"></ion-icon> Location:</span>
                        {{ result.location }}
                    </h5>
                    <h5>
                        <span><ion-icon name="time-outline"></ion-icon> Join at:</span>
                        {{ regexpTime(result.created_at) }}
                    </h5>
                    <h5 class="main-infor-org">
                        <span><ion-icon name="logo-github"></ion-icon>Organizations:</span>
                        <img v-for="org in orgs" :key="org.id" :src="org.avatar_url" />
                    </h5>
                </div>
            </div>
        </div>
        <teleport to="body">
            <div v-if="modalOpen" class="modal">
                <div><Followers /></div>
                <button @click="modalOpen = false"><ion-icon name="close-outline"></ion-icon>Close</button>
            </div>
        </teleport>
    </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main.js";
import Followers from "@/layouts/Followers.vue"

export default {
    components: {
        Followers
    },
    data() {
        return {
            name: "",
            result: "",
            error: "",
            isLoading: false,
            orgs: "",
            stars: "",
            modalOpen: false
        };
    },
    methods: {
        onSubmit: function () {
            if (this.name != "") {
                this.isLoading = true;

                eventBus.$emit("childSendName", this.name);
                eventBus.$emit("childSendTime", new Date());
                axios.get("https://api.github.com/users/" + this.name)
                    .then((response) => {
                        this.result = response.data;

                        this.isLoading = false;
                        console.log(response);
                    })
                    .catch((error) => {
                        this.result = "";
                        this.error = error;
                        this.loading = false;
                    });
                ///////////////////////////////////////////////////////////////
                axios
                    .get("https://api.github.com/users/" + this.name + "/orgs")
                    .then((response) => {
                        this.orgs = response.data;
                    });
                ///////////////////////////////////////////////////////////////
                axios
                    .get("https://api.github.com/users/" + this.name + "/starred")
                    .then((response) => {
                        this.stars = response.data;
                        console.log(this.stars.length);
                    });
            } else {
                this.result = "";
                this.error = "";
                this.loading = false;
            }
        },
        regexpTime(time) {
            return time.slice(0, 10);
        }
    },
};
</script>

<style scoped>
.container {
    width: 65%;
    border-radius: 10px;
    border: 1px dashed orange;
    background: white;
}
form > input {
    width: 300px;
    height: 40px;
    padding-left: 10px;
    outline: none;
    border: 1px solid gray;
    border-radius: 10px;
    transition: 0.3s linear;
}
form > input:hover {
    width: 360px;
}
form > img {
    width: 43px;
    height: 43px;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 1px 1px 1px gray;
    transition: 0.1s linear;
}
form > img:hover {
    box-shadow: 2px 2px 4px gray;
}
.loading {
    color: red;
    text-align: center;
    padding: 0;
    margin: 10px 0;
}
.main {
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
}
/*----------------------------------------*/
.main-avatar {
    width: 30%;
    display: grid;
    justify-content: center;
    align-items: center;
}
.main-avatar > img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 4px double rgba(48, 170, 48, 0.733);
    justify-self: center;
    margin-bottom: 10px;
}
.main-avatar:after {
    content: url("https://media.giphy.com/media/JP6cspn7JlVimeUhfW/giphy.gif");
    position: absolute;
    transform: scale(0.32);
    z-index: 2;
    left: -110px;
    top: -82px;
}
.main-avatar > h1,
.main-avatar > a > h4 {
    margin: 0;
    padding: 0;
    text-align: center;
}
/*----------------------------------------*/
.main-infor {
    width: 70%;
}
.main-infor-statical {
    display: flex;
    width: 100%;
    grid-gap: 10px;
}
.main-infor-statical > div {
    display: grid;
    text-align: center;
    padding: 0;
}
.main-infor-statical > div > h1 {
    background: linear-gradient(180deg, pink, rgba(0, 255, 21, 0.363));
    padding: 8px 11px;
    border-radius: 12px;
    font-weight: bold;
    transition: 0.4s;
}
.main-infor-statical > div > h1:hover {
    cursor: pointer;
    box-shadow: 2px 2px 5px gray;
    transform: scale(1.02);
}
.main-infor-statical > div > h2 {
    border-bottom: 1px solid rgba(128, 128, 128, 0.288);
    padding: 10px 20px;
}
.main-infor-label {
    width: 100%;
}
.main-infor-label > h5 {
    padding: 2px 0 2px 15px;
    word-wrap: wrap;
    line-height: 1.6rem;
}
.main-infor-label > h5 > span {
    font-weight: bold;
}
.main-infor-org {
    display: flex;
    width: 95%;
    grid-gap: 10px;
    overflow-x: hidden;
}
.main-infor-org>span{
    display: flex;
}
.main-infor-org:hover {
    overflow-x: scroll;
    cursor: pointer;
}
.main-infor-org > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
}
/**********************************************************************/
.modal {
    position: absolute;
    top: 100px;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    padding: 5px;
}

.modal > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 700px;
    height: 500px;
    border-radius: 12px;
    border: 2px solid green;
    overflow-y:scroll;
}
.modal > button {
    outline: none;
    border: none;
    border-radius: 5px;
    background: pink;
}
</style>
