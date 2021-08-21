const startBtn = document.getElementById("startBtn");
const downloadBtn = document.getElementById("downloadBtn");
const preview = document.getElementById("preview");

let stream = null;
let recorder = null;
let recorderTimeOut = null;
let videoFile = null;

const handleStop = () => {
  startBtn.innerText = "Start Recording";
  downloadBtn.disabled = false;
  downloadBtn.hidden = false;

  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleStart);
  recorder.stop();
  clearTimeout(recorderTimeOut);
};
const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    preview.src = videoFile;
    preview.play();
  };
  recorder.start();
  recorderTimeOut = setTimeout(handleStop, 10000);
};
const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
};
const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
};
init();

startBtn.addEventListener("click", handleStart);
downloadBtn.addEventListener("cilck", handleDownload);
