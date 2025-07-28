// Pomodoro Timer Logic
const WORK_DURATION = 25 * 60; // seconds
const BREAK_DURATION = 5 * 60;
const LONG_BREAK_DURATION = 15 * 60;
const CYCLES_BEFORE_LONG = 4;

let secondsLeft = WORK_DURATION;
let timerInterval = null;
let currentSession = "work"; // 'work', 'break', 'longBreak'
let cycleCount = 1;

const timerEl = document.getElementById("timer");
const sessionLabelEl = document.getElementById("session-label");
const startPauseBtn = document.getElementById("start-pause");
const resetBtn = document.getElementById("reset");
const cycleInfoEl = document.getElementById("cycle-info");

// Request notification permission ASAP
if ("Notification" in window && Notification.permission === "default") {
  Notification.requestPermission();
}

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function updateDisplay() {
  timerEl.textContent = formatTime(secondsLeft);
  sessionLabelEl.textContent = currentSession === "work" ? "Work" : currentSession === "break" ? "Break" : "Long Break";
  cycleInfoEl.textContent = `Cycle ${cycleCount} / ${CYCLES_BEFORE_LONG}`;
}

function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 880; // A5
    osc.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 500);
  } catch (e) {
    // Fallback: do nothing
  }
}

function notify(message) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(message);
  }
}

function switchSession() {
  if (currentSession === "work") {
    if (cycleCount % CYCLES_BEFORE_LONG === 0) {
      currentSession = "longBreak";
      secondsLeft = LONG_BREAK_DURATION;
    } else {
      currentSession = "break";
      secondsLeft = BREAK_DURATION;
    }
  } else {
    currentSession = "work";
    secondsLeft = WORK_DURATION;
    if (currentSession === "work") cycleCount += 1;
  }
  updateDisplay();
}

function tick() {
  secondsLeft -= 1;
  if (secondsLeft <= 0) {
    beep();
    notify(`${currentSession === "work" ? "Work" : "Break"} session finished!`);
    switchSession();
  }
  updateDisplay();
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(tick, 1000);
  startPauseBtn.textContent = "Pause";
  resetBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  startPauseBtn.textContent = "Start";
}

function resetTimer() {
  pauseTimer();
  currentSession = "work";
  secondsLeft = WORK_DURATION;
  cycleCount = 1;
  updateDisplay();
  resetBtn.disabled = true;
}

startPauseBtn.addEventListener("click", () => {
  if (timerInterval) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener("click", resetTimer);

// initial display
updateDisplay();
