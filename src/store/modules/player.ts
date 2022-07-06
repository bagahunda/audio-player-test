import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { TrackListType, PlayerStatus } from "@/types/player";

@Module({ namespaced: true })
class Player extends VuexModule {
  public trackList: TrackListType = [];
  public activeTrack = "";
  public status: PlayerStatus = PlayerStatus.paused;
  public currentTime = "00:00";

  @Mutation
  public setTrackList(payload: TrackListType): void {
    this.trackList = payload;
  }

  @Mutation
  public setActiveTrack(payload: string): void {
    this.activeTrack = payload;
    // this.status = PlayerStatus.playing;
  }

  @Mutation
  public setPlayerStatus(payload: PlayerStatus): void {
    this.status = payload;
  }

  @Mutation
  public setCurrentTime(payload: string): void {
    this.currentTime = payload;
  }

  @Action
  public updateTrackList(payload: TrackListType): void {
    this.context.commit("setTrackList", payload);
  }

  @Action
  public updateActiveTrack(payload: string): void {
    this.context.commit("setActiveTrack", payload);
  }

  @Action
  public updatePlayerStatus(payload: PlayerStatus): void {
    this.context.commit("setPlayerStatus", payload);
  }

  @Action
  public updateCurrentTime(payload: string): void {
    this.context.commit("setCurrentTime", payload);
  }

  @Action
  public setPreviousTrack() {
    if (this.currentTrack) {
      const index = this.trackList.indexOf(this.currentTrack);
      let newIndex;
      if (index > 0) {
        newIndex = index - 1;
      } else {
        newIndex = this.trackList.length - 1;
      }
      const active = this.trackList[newIndex].title;
      this.context.commit("setActiveTrack", active);
    }
  }

  @Action
  public setNextTrack() {
    if (this.currentTrack) {
      const index = this.trackList.indexOf(this.currentTrack);
      let newIndex;
      if (index === this.trackList.length - 1) {
        newIndex = 0;
      } else {
        newIndex = index + 1;
      }
      const active = this.trackList[newIndex].title;
      this.context.commit("setActiveTrack", active);
    }
  }

  get currentTrack() {
    return this.trackList.find((track) => track.title === this.activeTrack);
  }
}
export default Player;
