<template>
  <div id="app">
    <template v-if="!error && trackList.length">
      <div class="player-container">
        <app-player />
      </div>
      <div class="container">
        <track-list />
      </div>
    </template>
    <template v-if="error">
      <div class="error">
        {{ error }}
        <button class="btn" @click="getTrackList">Попробуйте ещё раз</button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { playerService } from "@/services/player";
import { TrackListType } from "@/types/player";
import AppPlayer from "@/components/AppPlayer.vue";
import TrackList from "@/components/TrackList.vue";

const player = namespace("Player");

@Component({
  components: {
    AppPlayer,
    TrackList,
  },
})
export default class App extends Vue {
  public error = "";

  @player.State
  public trackList!: TrackListType;

  @player.Action
  public updateTrackList!: (payload: TrackListType) => void;

  @player.Action
  public updateActiveTrack!: (payload: string) => void;

  public async getTrackList() {
    this.error = "";
    try {
      const recordList = await playerService.getTrackList(
        "/releases?items_per_page=8&page=0&_format=json&sort_by=field_release_date_value&sort_order=DESC"
      );

      this.updateTrackList(recordList);
      this.updateActiveTrack(recordList[0].title);
    } catch (error) {
      this.error = String(error);
    }
  }

  async mounted() {
    await this.getTrackList();
  }
}
</script>

<style lang="scss">
/***
    The new CSS reset - version 1.6.0 (last updated 29.4.2022)
    GitHub page: https://github.com/elad2412/the-new-css-reset
***/

/*
    Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
    - The "symbol *" part is to solve Firefox SVG sprite bug
 */
*:where(:not(html, iframe, canvas, img, svg, video):not(svg *, symbol *)) {
  all: unset;
  display: revert;
}

/* Preferred box-sizing value */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Reapply the pointer cursor for anchor tags */
a,
button {
  cursor: revert;
}

/* Remove list styles (bullets/numbers) */
ol,
ul,
menu {
  list-style: none;
}

/* For images to not be able to exceed their container */
img {
  max-width: 100%;
}

/* removes spacing between cells in tables */
table {
  border-collapse: collapse;
}

/* revert the 'white-space' property for textarea elements on Safari */
textarea {
  white-space: revert;
}

/* minimum style to allow to style meter element */
meter {
  -webkit-appearance: revert;
  appearance: revert;
}

/* reset default text opacity of input placeholder */
::placeholder {
  color: unset;
}

/* fix the feature of 'hidden' attribute.
   display:revert; revert to element instead of attribute */
:where([hidden]) {
  display: none;
}

/* revert for bug in Chromium browsers
   - fix for the content editable attribute will work properly. */
:where([contenteditable]) {
  -moz-user-modify: read-write;
  -webkit-user-modify: read-write;
  overflow-wrap: break-word;
  -webkit-line-break: after-white-space;
}

/* apply back the draggable feature - exist only in Chromium and Safari */
:where([draggable="true"]) {
  -webkit-user-drag: element;
}

:root {
  --dark-color: hsl(var(--hue), 100%, 9%);
  --light-color: hsl(var(--hue), 95%, 98%);
  --base: hsl(var(--hue), 95%, 50%);
  --complimentary1: hsl(var(--hue-complimentary1), 95%, 50%);
  --complimentary2: hsl(var(--hue-complimentary2), 95%, 50%);

  --font-family: "Poppins", system-ui;

  --bg-gradient: linear-gradient(
    to bottom,
    hsl(var(--hue), 95%, 99%),
    hsl(var(--hue), 95%, 84%)
  );
}

/* Fonts
  * *********************************** */

body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 18px;
  line-height: 1.5;
  color: #212529;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Cormorant SC";
  font-weight: 700;
}

b {
  font-weight: 700;
}

i {
  font-style: italic;
}

/* Base classes
  * *********************************** */
.container {
  margin: 0 auto;
  width: 90%;
  max-width: 1140px;
}

.container--slim {
  max-width: 80ch;
}

:disabled,
[disabled],
[aria-disabled="true"] {
  cursor: not-allowed;
}

a {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}

a:hover {
  color: #0056b3;
  text-decoration: underline;
}

a:not([href]):not([tabindex]) {
  color: inherit;
  text-decoration: none;
}

a:not([href]):not([tabindex]):focus,
a:not([href]):not([tabindex]):hover {
  color: inherit;
  text-decoration: none;
}

a:not([href]):not([tabindex]):focus {
  outline: 0;
}

.btn {
  padding: 0.5em;
  background-color: #0056b3;
  color: white;
  border-radius: 6px;
  appearance: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #007bff;
  }
}

.error {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

.player-container {
  position: sticky;
  top: 0;
  background-color: white;
}
</style>
