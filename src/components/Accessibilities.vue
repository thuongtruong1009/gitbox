<template>
  <section class="container" v-if="this.isHaveName">
    <div class="contributing-chart">
       <img :src="this.contributingChartURL" alt="Name Your Github chart">
    </div>
    <div class="lang-stat">
      <div class="streak">
        <img :src="this.streakURL" />
      </div>
      <div class="stat">
        <img :src="this.statURL" />
      </div>
    </div>
    <div class="graph-lang">
      <img :src="this.graphURL" />
      <img :src="this.langURL" />
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
      contributingChartURL: "",
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
        this.contributingChartURL="http://ghchart.rshah.org/"+transfer;
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
  margin-bottom: 30px;
  width: 100%;
  justify-content: center;
  grid-gap: 15px;
}
.contributing-chart{
  display: flex;
  justify-content: center;
  justify-self: center;
  align-items: center;
  background: black;
  border-radius: 15px;
  width: 70vw;
}
.contributing-chart>img{
  width: 95%;
  height: 95%;
}
.lang-stat {
  display: flex;
  justify-content: center;
}
.lang-stat {
  display: flex;
  grid-gap: 20px;
}
.streak > img {
  width: 430px;
  height: 100%;
}
.graph-lang {
  display: flex;
  justify-content: center;
  grid-gap: 10px;
}
.graph-lang > img:nth-child(1) {
  width: 600px;
  border-radius: 20px;
}
.graph-lang > img:nth-child(2) {
  width: 350px;
}
.trophy {
  display: flex;
  justify-content: center;
  justify-self: center;
}

</style>