<template>
  <div class="track-list">
    <div
      class="track-list__item"
      :class="{ 'track-list__item--active': track.title === activeTrack }"
      v-for="track in trackList"
      :key="track.title"
      @click="onTrackClick(track.title)"
    >
      <template
        v-if="status !== PlayerStatus.playing || activeTrack !== track.title"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </template>
      <template
        v-else-if="
          status === PlayerStatus.playing && activeTrack === track.title
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </template>
      <div class="track-list__item-title">
        {{ track.title }}
      </div>
      <div class="trackList__item-time" v-if="activeTrack === track.title">
        {{ currentTime }}
      </div>
      <div
        class="bars"
        v-if="status === PlayerStatus.playing && activeTrack === track.title"
      >
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { TrackListType, PlayerStatus } from "@/types/player";

const player = namespace("Player");

@Component({})
export default class TrackList extends Vue {
  @player.State
  public trackList!: TrackListType;
  @player.State
  public activeTrack!: string;
  @player.State
  public status!: PlayerStatus;
  @player.State
  public currentTime!: PlayerStatus;

  @player.Action
  public updateActiveTrack!: (payload: string) => void;

  @player.Action
  updatePlayerStatus!: (payload: PlayerStatus) => void;

  public PlayerStatus = PlayerStatus;

  public onTrackClick(title: string) {
    if (title === this.activeTrack) {
      const newStatus =
        this.status === PlayerStatus.playing
          ? PlayerStatus.paused
          : PlayerStatus.playing;
      this.updatePlayerStatus(newStatus);
    } else {
      this.updatePlayerStatus(PlayerStatus.paused);
      this.$nextTick(() => {
        this.updateActiveTrack(title);
        this.updatePlayerStatus(PlayerStatus.playing);
      });
    }
  }
}
</script>

<style scoped lang="scss">
.track-list {
  display: flex;
  flex-direction: column;
}

.track-list__item {
  display: flex;
  align-items: center;
  padding: 1em;
  min-height: 68px;
  cursor: pointer;
  font-weight: 500;
  background-color: rgb(249, 250, 251);
  border-radius: 8px;
  border: 1px solid transparent;

  &:not(:last-child) {
    margin-bottom: 1em;
  }
}

.track-list__item--active {
  border-color: red;
}

svg {
  width: 1em;
  margin-right: 0.5em;
}

.trackList__item-time {
  margin-left: 1em;
  font-size: 0.8rem;
}

.bars {
  width: 30px;
  height: 30px;
  position: relative;
  margin-left: auto;
}

.bar {
  bottom: 1px;
  height: 3px;
  position: absolute;
  width: 3px;
  animation: sound 0ms -800ms linear infinite alternate;
}

.bar:nth-child(1) {
  left: 1px;
  animation-duration: 474ms;
}

.bar:nth-child(2) {
  left: 5px;
  animation-duration: 433ms;
}

.bar:nth-child(3) {
  left: 9px;
  animation-duration: 407ms;
}

.bar:nth-child(4) {
  left: 13px;
  animation-duration: 458ms;
}

.bar:nth-child(5) {
  left: 17px;
  animation-duration: 400ms;
}

.bar:nth-child(7) {
  left: 25px;
  animation-duration: 441ms;
}

@keyframes sound {
  0% {
    opacity: 0.35;
    background: #05276c;
    height: 3px;
  }
  100% {
    opacity: 1;
    background: #95cde2;
    height: 28px;
  }
}
</style>
