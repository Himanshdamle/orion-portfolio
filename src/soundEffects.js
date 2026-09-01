import { isSoundOn } from "./events";

const swoosh = document.querySelector("#swoosh-music");
export function swooshSoundEffect(volume = 0.35) {
  swoosh.volume = volume;
  if (!isSoundOn) return;
  swoosh.play();
}

const deepSwoosh = document.querySelector("#deep-swoosh-music");
export function deepSwooshSoundEffect(volume = 0.25) {
  deepSwoosh.volume = volume;
  if (!isSoundOn) return;
  deepSwoosh.currentTime = 0;
  deepSwoosh.play();
}

const ping = document.querySelector("#ping-music");
ping.volume = 0.25;
export function pingSoundEffect() {
  if (!isSoundOn) return;
  ping.currentTime = 0;
  ping.play();
}
