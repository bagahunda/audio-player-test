<template>
  <div class="player">
    <div class="progress" @click="onProgressClick" ref="progress">
      <div class="progress__time" :style="{ width: progressWidth }"></div>
    </div>
    <div class="player__section player__section--time">
      <p>{{ currentTime }}</p>
      <p>{{ duration }}</p>
    </div>
    <div class="player__section">
      <h3 class="player__title" v-if="currentTrack">
        {{ currentTrack.title }}
        <span class="player__date">{{ currentTrack.date }}</span>
      </h3>
    </div>
    <div class="player__section player__section--buttons">
      <div class="player__button" @click="onSetPreviousTrack">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
          />
        </svg>
      </div>
      <div class="player__button" @click="toggleStatus">
        <template v-if="status !== PlayerStatus.playing">
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
        <template v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </template>
      </div>
      <div class="player__button" @click="onSetNextTrack">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
          />
        </svg>
      </div>
    </div>
    <div
      class="player__section player__section--volume"
      :class="{ 'player__section--muted': player && player.volume === 0 }"
    >
      <div class="player__button" @click="toggleMute">
        <template v-if="player && player.volume !== 0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        </template>
        <template v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        </template>
      </div>
      <input
        type="radio"
        name="volume"
        id="vol0"
        value="0"
        @change="setVolume"
      />
      <label for="vol0"></label>

      <input
        type="radio"
        name="volume"
        id="vol10"
        value="0.1"
        @change="setVolume"
      />
      <label for="vol10"></label>

      <input
        type="radio"
        name="volume"
        id="vol20"
        value="0.2"
        @change="setVolume"
      />
      <label for="vol20"></label>

      <input
        type="radio"
        name="volume"
        id="vol13"
        value="0.3"
        @change="setVolume"
      />
      <label for="vol30"></label>

      <input
        type="radio"
        name="volume"
        id="vol40"
        value="0.4"
        @change="setVolume"
      />
      <label for="vol40"></label>

      <input
        type="radio"
        name="volume"
        id="vol50"
        value="0.5"
        @change="setVolume"
      />
      <label for="vol50"></label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { ITrack, PlayerStatus } from "@/types/player";

const player = namespace("Player");

@Component
export default class AppPlayer extends Vue {
  public player: HTMLAudioElement | null = null;

  public PlayerStatus = PlayerStatus;

  public progressWidth = "0";

  public duration = "00:00";

  public lastVolume = 0;

  @player.State
  public status!: PlayerStatus;

  @player.State
  public currentTime!: PlayerStatus;

  @player.Getter
  public currentTrack!: ITrack;

  @player.Action
  updatePlayerStatus!: (payload: PlayerStatus) => void;

  @player.Action
  setPreviousTrack!: () => void;

  @player.Action
  setNextTrack!: () => void;

  @player.Action
  updateCurrentTime!: (payload: string) => void;

  created() {
    this.player = new Audio();
    this.player.src = this.currentTrack.audiofile_url;
    this.player.ontimeupdate = () => {
      this.generateTime();
    };
    this.player.onended = () => {
      this.onSetNextTrack();
    };
    this.player.onloadedmetadata = () => {
      const duration = this.player?.duration || 0;
      let durmin = Math.floor(duration / 60);
      let dursec = Math.floor(duration - durmin * 60) + "";
      this.duration = `${(durmin + "").padStart(2, "0")}:${dursec.padStart(
        2,
        "0"
      )}`;
    };
  }

  @Watch("currentTrack")
  currentTrackChanged(newVal: ITrack) {
    console.log("current track changed");
    if (this.player) {
      this.player.src = newVal.audiofile_url;
    }
  }

  @Watch("status")
  statusChanged(newVal: string) {
    if (newVal === "playing") {
      this.$nextTick(() => {
        this.player?.play();
      });
    } else {
      this.$nextTick(() => {
        this.player?.pause();
      });
    }
  }

  public onSetPreviousTrack() {
    this.updatePlayerStatus(PlayerStatus.paused);
    this.setPreviousTrack();
    this.$nextTick(() => {
      this.updatePlayerStatus(PlayerStatus.playing);
    });
  }

  public onSetNextTrack() {
    this.updatePlayerStatus(PlayerStatus.paused);
    this.setNextTrack();
    this.$nextTick(() => {
      this.updatePlayerStatus(PlayerStatus.playing);
    });
  }

  public onProgressClick(e: MouseEvent) {
    this.updatePlayerStatus(PlayerStatus.paused);
    this.updateProgress(e.pageX);
  }

  public toggleStatus() {
    const newStatus =
      this.status === PlayerStatus.playing
        ? PlayerStatus.paused
        : PlayerStatus.playing;
    this.updatePlayerStatus(newStatus);
  }

  public setVolume(e: Event) {
    if (this.player) {
      this.player.volume = +(e.target as HTMLInputElement).value;
    }
  }

  public toggleMute() {
    if (this.player && this.status === PlayerStatus.playing) {
      const currentVolume = this.player?.volume || 0;
      if (currentVolume > 0) {
        this.lastVolume = currentVolume;
        this.player.volume = 0;
      } else {
        if (this.lastVolume) {
          this.player.volume = this.lastVolume;
        } else {
          this.player.volume = 1;
        }
      }
    }
  }

  private updateProgress(coord: number) {
    const progress = this.$refs.progress as HTMLDivElement;
    const duration = this.player?.duration || 0;
    const position = coord - progress?.offsetLeft;
    let percentage = (100 * position) / progress?.offsetWidth;
    if (percentage > 100) {
      percentage = 100;
    }
    if (percentage < 0) {
      percentage = 0;
    }
    this.progressWidth = `${percentage}%`;
    if (this.player) {
      this.player.currentTime = (duration * percentage) / 100;
    }
    this.updatePlayerStatus(PlayerStatus.playing);
  }

  private generateTime() {
    if (this.player) {
      let width = (100 / this.player.duration) * this.player.currentTime;
      this.progressWidth = `${width}%`;
      let curmin = Math.floor(this.player.currentTime / 60);
      let cursec = Math.floor(this.player.currentTime - curmin * 60) + "";
      this.updateCurrentTime(
        `${(curmin + "").padStart(2, "0")}:${cursec.padStart(2, "0")}`
      );
    }
  }
}
</script>

<style scoped lang="scss">
.player {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.player__section {
  width: 100%;
}

.player__section--time {
  display: flex;
  justify-content: space-between;
  padding: 0.3em;
  font-size: 0.8em;
}

.player__section--buttons {
  display: flex;
  justify-content: center;
  margin-top: 1em;
}

.progress {
  width: 100%;
  background: #0d0d0d;
  height: 2rem;
  cursor: crosshair;
  overflow: hidden;
}

.progress__time {
  height: 100%;
  background: linear-gradient(30deg, #0b90e3 0%, #c5dcdf 100%);
}

.player__title {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
}

.player__date {
  font-size: 0.8rem;
  font-weight: 400;
}

.player__button {
  width: 2em;
  height: 2em;
  cursor: pointer;
}

.player__section--volume {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
}

.player__section--volume input ~ label {
  background: #0b90e3;
  border-right: 2px solid #1d1d1d;
  width: 12px;
  height: 2rem;
  cursor: pointer;
}

.player__section--volume input:checked ~ label {
  background: #e4e4e4;
}

.player__section--volume input:checked + label {
  background: #0b90e3;
}

.player__section--muted input ~ label,
.player__section--muted input:checked + label {
  background: #e4e4e4;
}
</style>
