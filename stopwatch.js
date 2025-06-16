let interval = null;
let time = 0;
let isRunning = false;

const display = {
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const buttons = {
  start: document.getElementById("startButton"),
  stop: document.getElementById("stopButton"),
  pause: document.getElementById("pauseButton"),
  resume: document.getElementById("resumeButton"),
  reset: document.getElementById("resetButton"),
};

function updateDisplay() {
  const hrs = String(Math.floor(time / 3600)).padStart(2, "0");
  const mins = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const secs = String(time % 60).padStart(2, "0");

  display.hours.textContent = hrs;
  display.minutes.textContent = mins;
  display.seconds.textContent = secs;
}

function startTimer() {
  interval = setInterval(() => {
    time++;
    updateDisplay();
  }, 1000);
}

buttons.start.addEventListener("click", () => {
  startTimer();
  isRunning = true;
  buttons.start.disabled = true;
  buttons.stop.disabled = false;
  buttons.pause.disabled = false;
  buttons.reset.disabled = false;
});

buttons.pause.addEventListener("click", () => {
  clearInterval(interval);
  isRunning = false;
  buttons.pause.disabled = true;
  buttons.resume.disabled = false;
});

buttons.resume.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
    buttons.resume.disabled = true;
    buttons.pause.disabled = false;
  }
});

buttons.stop.addEventListener("click", () => {
  clearInterval(interval);
  isRunning = false;
  time = 0;
  updateDisplay();
  buttons.start.disabled = false;
  buttons.stop.disabled = true;
  buttons.pause.disabled = true;
  buttons.resume.disabled = true;
  buttons.reset.disabled = true;
});

buttons.reset.addEventListener("click", () => {
  time = 0;
  updateDisplay();
});