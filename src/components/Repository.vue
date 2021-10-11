<template>
  <div class="mb-6">
    <section class="hero is-medium is-primary is-bold mb-6">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Get GitHub Repositories</h1>
          <h2 class="subtitle">using Vue JS, REST API &amp; Bulma</h2>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="table-container">
        <table class="table is-bordered is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>URL</th>
              <th>Language</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="repo in repos" :key="repo.id">
              <td>{{ repo.id }}</td>
              <td>
                <a v-bind:href="repo.html_url">{{ repo.name }}</a>
              </td>
              <td>{{ repo.description }}</td>
              <td>{{ repo.language }}</td>
              <td>{{ repo.size }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Repository",
  data() {
    return {
      repos: null,
    };
  },
  created: function () {
    axios
      .get("https://api.github.com/users/thuongtruong1009/repos")
      .then((response) => {
        this.repos = response.data;
      });
  },
};
</script>

<style>
body {
  font: 15px/1.8 "Poppins", sans-serif !important;
}

.table td,
.table th {
  padding: 20px !important;
}
</style>
