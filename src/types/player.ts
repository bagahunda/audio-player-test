export interface ITrack {
  title: string;
  audiofile_url: string;
  date: string;
}

export type TrackListType = ITrack[];

export enum PlayerStatus {
  playing = "playing",
  paused = "paused",
}
