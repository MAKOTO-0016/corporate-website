import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const WORK_DURATION = 25 * 60; // 25 minutes
const SHORT_BREAK = 5 * 60; // 5 minutes
const LONG_BREAK = 15 * 60; // 15 minutes
const BREATH_REMINDER_INTERVAL = 30; // 30 seconds

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

const getToday = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

function App() {
  const [mode, setMode] = useState('work'); // work, shortBreak, longBreak
  const [timer, setTimer] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [workCount, setWorkCount] = useState(0);
  const [showFocusDialog, setShowFocusDialog] = useState(false);
  const [focusInput, setFocusInput] = useState(3);
  const [breathReminder, setBreathReminder] = useState(false);
  const [breathTick, setBreathTick] = useState(0);
  const [todayStats, setTodayStats] = useState({ count: 0, focusSum: 0 });
  const intervalRef = useRef();
  const breathRef = useRef();

  // Load today's stats from localStorage
  useEffect(() => {
    const today = getToday();
    const stats = JSON.parse(localStorage.getItem('pomodoro-stats') || '{}');
    if (stats[today]) {
      setTodayStats(stats[today]);
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          if (mode === 'work') {
            setShowFocusDialog(true);
            setWorkCount((c) => c + 1);
          } else {
            // break finished
            setMode('work');
            setTimer(WORK_DURATION);
            setIsRunning(false);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode]);

  // Breath reminder logic
  useEffect(() => {
    if (mode === 'shortBreak' || mode === 'longBreak') {
      setBreathTick(0);
      setBreathReminder(false);
      breathRef.current = setInterval(() => {
        setBreathTick((tick) => {
          if ((tick + 1) % BREATH_REMINDER_INTERVAL === 0) {
            setBreathReminder(true);
            setTimeout(() => setBreathReminder(false), 3000);
          }
          return tick + 1;
        });
      }, 1000);
      return () => clearInterval(breathRef.current);
    } else {
      setBreathReminder(false);
      setBreathTick(0);
      clearInterval(breathRef.current);
    }
  }, [mode]);

  // Handle focus dialog submit
  const handleFocusSubmit = () => {
    setShowFocusDialog(false);
    // Save today's stats
    const today = getToday();
    const stats = JSON.parse(localStorage.getItem('pomodoro-stats') || '{}');
    const prev = stats[today] || { count: 0, focusSum: 0 };
    const updated = {
      count: prev.count + 1,
      focusSum: prev.focusSum + focusInput,
    };
    stats[today] = updated;
    localStorage.setItem('pomodoro-stats', JSON.stringify(stats));
    setTodayStats(updated);
    // Next mode
    if ((workCount + 1) % 4 === 0) {
      setMode('longBreak');
      setTimer(LONG_BREAK);
    } else {
      setMode('shortBreak');
      setTimer(SHORT_BREAK);
    }
    setIsRunning(false);
  };

  // Handle reset
  const handleReset = () => {
    setIsRunning(false);
    if (mode === 'work') setTimer(WORK_DURATION);
    else if (mode === 'shortBreak') setTimer(SHORT_BREAK);
    else setTimer(LONG_BREAK);
  };

  // Background color
  useEffect(() => {
    if (mode === 'work') {
      document.body.style.background = 'linear-gradient(135deg, #ff6a6a 0%, #ffb347 100%)';
    } else {
      document.body.style.background = 'linear-gradient(135deg, #4f8cff 0%, #6ad1ff 100%)';
    }
    return () => {
      document.body.style.background = '';
    };
  }, [mode]);

  // Stats
  const avgFocus = todayStats.count ? (todayStats.focusSum / todayStats.count).toFixed(2) : '-';

  return (
    <div className="pomodoro-app">
      <h1>ポモドーロタイマー</h1>
      <div className="timer-display">
        <span className="timer-mode">{mode === 'work' ? '作業' : mode === 'shortBreak' ? '休憩' : '長い休憩'}</span>
        <div className="timer-time">{formatTime(timer)}</div>
      </div>
      <div className="stats">
        <div>今日のポモドーロ回数: {todayStats.count}</div>
        <div>集中度平均: {avgFocus}</div>
      </div>
      <div className="controls">
        <button onClick={() => setIsRunning((r) => !r)}>{isRunning ? '一時停止' : 'スタート'}</button>
        <button onClick={handleReset}>リセット</button>
      </div>
      {breathReminder && (
        <div className="breath-reminder">深呼吸しましょう！</div>
      )}
      {showFocusDialog && (
        <div className="focus-dialog-backdrop">
          <div className="focus-dialog">
            <div>集中度を1〜5で記録してください</div>
            <input
              type="range"
              min="1"
              max="5"
              value={focusInput}
              onChange={(e) => setFocusInput(Number(e.target.value))}
            />
            <div className="focus-value">{focusInput}</div>
            <button onClick={handleFocusSubmit}>記録</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
