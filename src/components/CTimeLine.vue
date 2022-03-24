<template>
    <div class="uk-container uk-padding">
      <div class="uk-timeline">
        <div class="uk-timeline-item" v-for="i in 4" :key="i">
          <div class="uk-timeline-icon">
            <span class="uk-badge">
              <span uk-icon="check"></span>
            </span>
          </div>
          <div class="uk-timeline-content">
            <div class="uk-card uk-card-default uk-margin-medium-bottom uk-overflow-auto">
              <div class="uk-card-header">
                <div class="uk-grid-small uk-flex-middle" uk-grid>
                  <h3 class="uk-card-title">
                    <time datetime="2020-07-08">July 8</time>
                  </h3>
                  <span class="uk-label uk-label-success uk-margin-auto-left">Feature</span>
                </div>
              </div>
              <div class="uk-card-body">
                <p
                  class="uk-text-success"
                >Fully responsive timeline you can add to your UIkit 3 project</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.uk-timeline .uk-timeline-item .uk-card {
  max-height: 300px;
}

.uk-timeline .uk-timeline-item {
  display: flex;
  position: relative;
  padding-left: 10rem;
}

.uk-timeline .uk-timeline-item::before {
  background: #dadee4;
  content: "";
  height: 100%;
  left: 19px;
  position: absolute;
  top: 20px;
  width: 2px;
  z-index: -1;
}

.uk-timeline .uk-timeline-item .uk-timeline-icon .uk-badge {
  margin-top: 20px;
  width: 40px;
  height: 40px;
}

.uk-timeline .uk-timeline-item .uk-timeline-content {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 0 0 0 1rem;
}
</style>