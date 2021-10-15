<template>
  <section class="container" v-if="this.isHaveName">
    <div class="lang-stat">
      <div class="lang">
        <img :src="this.langURL" />
      </div>
      <div class="stat"><img :src="this.statURL" /></div>
    </div>
    <div class="graph">
      <img :src="this.graphURL" />
    </div>
    <div class="trophy">
      <img :src="this.trophyURL" />
    </div>
    <!------------------------------------------------------------------------------------------------------------------------------------>
    <div class="decorate">
      <img
        src="https://media.giphy.com/media/26BREDkItN0Yy3i6Y/giphy.gif"
        width="30px"
        height="30px"
        v-for="index in footerDecorates"
        :key="index"
      />
    </div>

    <p>Last view on: 22/09/2021</p>
  </section>
</template>

<script>
import { eventBus } from "../main.js";
export default {
  data() {
    return {
      footerDecorates: Array(33),
      langURL: "",
      statURL: "",
      graphURL: "",
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
  grid-gap: 20px;
}
.lang > img {
  width: 350px;
  height: 100%;
}

.graph > img {
  width: 700px;
  height: 300px;
}
.decorate {
  display: flex;
}
</style>
