<template>
  <div class="container">
    <form class="d-flex justify-center align-center gap-3">
      <input
        class="form-control rounded"
        type="search"
        v-model="name"
        v-on:keydown.13="onSubmit"
        name="name"
        placeholder="typing Github @username..."
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'typing Github @username...'"
      />
      <img src="@/assets/git.png" :style="{width: '45px', height: '45px', cursor:'pointer', borderRadius: '50%'}"/>
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
            <h1>Followers</h1>
            <h2>{{ result.followers }}</h2>
          </div>

          <div>
            <h1>Following</h1>
            <h2>{{ result.following }}</h2>
          </div>

          <div>
            <h1>Repository</h1>
            <h2>{{ result.public_repos }}</h2>
          </div>

          <div>
            <h1>Star</h1>
            <h2>{{ this.stars.length }}</h2>
          </div>

          <div>
            <h1>Gist</h1>
            <h2>{{ result.public_gists }}</h2>
          </div>
        </div>
        <div class="main-infor-label">
          <h5>
            <span>Bio:</span>
            {{ result.bio }}
          </h5>
          <h5>
            <span>Company:</span>
            {{ result.company }}
          </h5>
          <h5>
            <span>Location:</span>
            {{ result.location }}
          </h5>
          <h5>
            <span>Join at:</span>
            {{ regexpTime(result.created_at) }}
          </h5>
          <h5 class="main-infor-org">
            <span>Organizations:</span>
            <img v-for="org in orgs" :key="org.id" :src="org.avatar_url" />
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main.js";

export default {
  data() {
    return {
      name: "",
      result: "",
      error: "",
      isLoading: false,
      orgs: "",
      stars: "",
    };
  },
  methods: {
    onSubmit: function () {
      if (this.name != "") {
        this.isLoading = true;

        eventBus.$emit("childSendName", this.name);
        eventBus.$emit("childSendTime", new Date());
        axios
          .get("https://api.github.com/users/" + this.name)
          .then((response) => {
            this.result = response.data;

            this.isLoading = false;
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
  width: 850px;
  padding: 20px 0;
  border: 1px dashed orange;
  border-radius: 15px;
  background: white;
}
input {
  width: 300px;
  height: 40px;
  margin: 5px 0 35px 35%;
  padding-left: 10px;
  outline: none;
  border: 1px solid gray;
  border-radius: 8px;
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
  padding: 8px 20px;
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
</style>