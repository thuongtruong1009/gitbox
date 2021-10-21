<template>
  <section class="container" v-if="this.isHaveName">
    <div class="lang-stat">
      <div class="lang">
        <img :src="this.langURL" />
      </div>
      <div class="stat">
        <img :src="this.statURL" />
      </div>
    </div>
    <div class="graph">
      <img :src="this.graphURL" />
      <img :src="this.streakURL" />
    </div>
    <div class="trophy">
      <img :src="this.trophyURL" />
    </div>
  </section>
</template>

<script>
import { eventBus } from "../main.js";
export default {
  data() {
    return {
      langURL: "",
      statURL: "",
      graphURL: "",
      streakURL: "",
      trophyURL: "",
      isHaveName: false,
    };
  },
  created() {
    eventBus.$on("childSendName", (transfer) => {
      if (transfer != "") {
        this.isHaveName = true;
        this.langURL =
          "https://github-readme-stats.vercel.app/api/top-langs/?username=" +
          transfer +
          "&&layout=compact&bg_color=0,73FA79,73FDFF,7A81FF&theme=graywhite&langs_count=12";
        this.statURL =
          "https://github-readme-stats.vercel.app/api?username=" +
          transfer +
          "&count_private=true&show_icons=true&line_height=21&bg_color=0,EC6C6C,FFD479,FFFC79,73FA79&theme=graywhite&include_all_commits=true";
        this.graphURL =
          "https://activity-graph.herokuapp.com/graph?username=" +
          transfer +
          "&theme=react-dark&hide_border=true&area=true";
        this.trophyURL =
          "https://github-profile-trophy.vercel.app/?username=" +
          transfer +
          "&column=8&margin-w=15&margin-h=15&no-bg=false&no-frame=false&theme=juicyfresh";
        this.streakURL =
          "https://github-readme-streak-stats.herokuapp.com/?user=" +
          transfer +
          "&theme=chartreuse-dark&hide_border=false";
      }
    });
  },
};
</script>

<style scoped>
.container {
  padding: 0;
  display: grid;
  margin-top: 30px;
  width: 100%;
  justify-content: center;
}
.lang-stat {
  display: flex;
  justify-content: center;
}
.lang-stat {
  display: flex;
  grid-gap: 20px;
}
.lang > img {
  width: 350px;
  height: 100%;
}
.graph {
  display: flex;
  justify-content: center;
  grid-gap: 10px;
  margin: 20px 0;
}
.graph > img:nth-child(1) {
  width: 600px;
  border-radius: 20px;
}
.graph > img:nth-child(2) {
  width: 450px;
}
.trophy {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
