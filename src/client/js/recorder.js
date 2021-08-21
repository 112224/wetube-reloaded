const startBtn = document.getElementById("startBtn");
const downloadBtn = document.getElementById("downloadBtn");
const preview = document.getElementById("preview");

let stream = null;
let recorder = null;
let recorderTimeOut = null;
let videoFile = null;

const init = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      videoFile = URL.createObjectURL(event.data);
      preview.src = videoFile;
      preview.loop = true;
      preview.play();
    };
    recorder.start();
    recorderTimeOut = setTimeout(handleStop, 10000);
  } catch {
    console.log("error :>> ", error);
  }
};

const handleStop = () => {
  downloadBtn.disabled = false;
  downloadBtn.hidden = false;
  downloadBtn.addEventListener("click", handleDownload);

  startBtn.innerText = "Start Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleRestart);
  recorder.stop();

  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    track.stop();
  });
  stream = null;
  clearTimeout(recorderTimeOut);
};
const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  init();
};
const handleRestart = () => {
  window.location.href = "/videos/upload";
};
const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.location.href = "/videos/upload";
};

startBtn.addEventListener("click", handleStart);
