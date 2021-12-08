<template>
  <div class="container">
    <table class="table table-striped" v-if="isHaveName">
      <thead>
        <tr class="table-danger">
          <th>ID</th>
          <th>Repository</th>
          <th>Desciption</th>
          <th>Fork</th>
          <th>Download</th>
          <th>Star</th>
          <th>Language</th>
          <th>Size (kb)</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-success" v-for="(repo, index) in repos" :key="repo.id">
          <td>{{ index }}</td>
          <td>
            <a :href="repo.html_url">{{ repo.name }}</a>
          </td>
          <td>{{ repo.description }}</td>
          <td>
            <a :href="`${repo.html_url}/fork`">
              <img src="@/assets/fork.svg" />
            </a>
          </td>
          <td>
            <a :href="`${repo.html_url}/archive/HEAD.zip`">
              <img src="@/assets/download.png" />
            </a>
          </td>
          <td>{{ repo.stargazers_count }}</td>
          <td>{{ repo.language }}</td>
          <td>{{ repo.size }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main.js";
export default {
  data() {
    return {
      repos: null,
      isHaveName: false,
    };
  },
  created() {
    eventBus.$on("childSendName", (transfer) => {
      if (transfer != "") {
        this.isHaveName = true;
        axios
          .get("https://api.github.com/users/" + transfer + "/repos")
          .then((response) => {
            this.repos = response.data;
          })
          .catch((error) => {
            this.error = error;
          });
      }
    });
  },
};
</script>

<style scoped>
th,
td {
  border: 1px solid gray;
}img{
  width: 26px;
  height: 26px;
  transition: 0.3s;
}
img:hover {
  cursor: pointer;
  transform: scale(1.2);
  border-radius: 50%;
  padding: 1px;
}
</style>