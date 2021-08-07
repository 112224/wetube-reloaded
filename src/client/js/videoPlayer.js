const video = document.querySelector("video");
const volume = document.getElementById("volume");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");

const handlePlayClick = (e) => {
  // if the vidoe is playing, pause
  if (video.paused) {
    playBtn.innerText = "Pause";
    video.play();
  } else {
    video.pause();
  }
};
const handlePause = (e) => {
  playBtn.innerText = "Play";
};
const handlePlay = (e) => {
  playBtn.innerText = "Pause";
};
const handleMute = (e) => {};
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlay);
