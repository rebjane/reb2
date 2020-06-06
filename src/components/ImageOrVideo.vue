<template>
  <div class="media-img-or-vid">
    <!-- <p>{{data.primary}}</p> -->
    <div
      class="video-wrapper"
      @click="playVideo"
      @mousedown="changeClassName"
      v-if="data.primary.media.name.includes('mp4')"
    >
      <transition name="vid">
        <div class="vid-icon" v-if="!play">
          <PlayVidCursor />
        </div>
      </transition>

      <video
        :class="`video ${className}`"
        preload
        ref="video"
        :src="`${data.primary.media.url}#t=0.1`"
      />
      <!-- <div class="play" /> -->
    </div>
    <div class="image-wrapper" v-else-if="data.primary.media.kind === 'image'">
      <div class="image" :style="`background-image: url(${data.primary.media.url})`">
        <img :src="data.primary.media.url" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Template",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      play: false,
      className: "playVid"
    };
  },
  methods: {
    playVideo() {
      if (!this.play) {
        this.$refs.video.play();
      } else {
        this.$refs.video.pause();
      }
      this.play = !this.play;
    },
    changeClassName() {
      switch (this.className) {
        case "playVid": {
          this.className = "pauseVid";
          break;
        }
        case "pauseVid": {
          this.className = "playVid";
          break;
        }
      }
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.media-img-or-vid {
  position: relative;
  // padding: 4em;
  @include workpadding();
  padding-top: 3em;
  padding-bottom: 3em;
}
.video {
  width: 100%;
  max-height: 70vh;
}
.video-wrapper {
  position: relative;
}
.image-wrapper {
  position: relative;
}
.image {
  max-height: 70vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  img {
    opacity: 0;
  }
}
.vid-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 35%;
  height: 35%;
  pointer-events: none;
  opacity: 1;
  // mix-blend-mode: difference;
  /deep/ .playvid {
    width: 100%;
    height: 100%;
    margin-left: 50%;
    svg {
      height: 100%;
      transform: translateX(-50%);
    }
  }
  // background: white;
}
.vid-enter-active,
.vid-leave-active {
  @include ease(opacity);
}
.vid-leave-to,
.vid-enter {
  opacity: 0;
}

.vid-enter-to {
  opacity: 1;
}
// .play {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate3d(-50%, -50%, 0);
//   width: 3em;
//   height: 3em;
//   background: white;
//   cursor: pointer;
// }
</style>
