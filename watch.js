let playBtn = document.querySelector(".play-btn");
let pauseBtn = document.querySelector(".pause-btn");
let resetBtn = document.querySelector(".reset-btn");
let timerBox = document.querySelector(".timer-box");
let body = document.querySelector("body");
let stopWatchBtn = document.querySelector(".swatch-btn");
let volumeBtn = document.querySelector(".volume-btn");
let seconds = 0;
let timerId = null;
let isRunning = false;
let stopWatchRingTone = new Audio('ringtone.mp3');
stopWatchRingTone.loop = true;
let isMuted = false;

playBtn.addEventListener("click", () => {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    resetBtn.style.display = 'block';
    timerBox.style.borderColor = "#76a5f1"   
    stopWatchRingTone.play().catch(error => {
        console.log("Error: ", error);
    });
    isRunning = true;
    startTimer(); 
})

window.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !(isRunning)) {
        event.preventDefault();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        resetBtn.style.display = 'block';   
        stopWatchRingTone.play().catch(error => {
        console.log("Error: ", error);
        });
        isRunning = true;
        pauseBtn.style.backgroundColor = "#76a5f1";
        resetBtn.style.backgroundColor = "#76a5f1";
        body.style.backgroundColor = "rgb(213, 230, 245)";
        timerBox.style.borderColor = "#76a5f1";
        pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        pauseBtn.style.border = "2px solid #0400ff";
        stopWatchBtn.style.borderColor = "none";
        stopWatchBtn.style.backgroundColor = "#a8c7fa";
        isRunning = true;
        startTimer();
    } else if (event.code === 'Space' && isRunning){
        clearInterval(timerId);
        pauseBtn.style.backgroundColor = "#f1ca76";
        resetBtn.style.backgroundColor = "#f1ca76";
        body.style.backgroundColor = "hsla(45, 100%, 92%, 0.99)";
        timerBox.style.borderColor = "grey";
        pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        stopWatchRingTone.pause();
        isRunning = false;
        pauseBtn.style.border = "2px solid #f7af13";
        stopWatchBtn.style.borderColor = "#f7af13";
        stopWatchBtn.style.backgroundColor = "#f1ca76";
    }
})

function startTimer() {
    clearInterval(timerId);
    timerId = setInterval(() => {
    seconds+=10;
    timerBox.innerHTML = formatTime(seconds);        
    }, 10);
}

function formatTime(seconds) {
    let mins = Math.floor(seconds/1000);
    let secs = Math.floor((seconds%1000)/10);
    let displayMins = mins < 10 ? "0" + mins : mins;
    let displaySecs = secs < 10 ? "0" + secs : secs;
    return `${displayMins}:${displaySecs}`;
}

pauseBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerId);
        pauseBtn.style.backgroundColor = "#f1ca76";
        resetBtn.style.backgroundColor = "#f1ca76";
        body.style.backgroundColor = "hsla(45, 100%, 92%, 0.99)";
        stopWatchBtn.style.borderColor = "#f7af13";
        stopWatchBtn.style.backgroundColor = "#f1ca76";
        timerBox.style.borderColor = "grey";
        pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        isRunning = false;
        stopWatchRingTone.pause();
    } else {
        startTimer();
        pauseBtn.style.backgroundColor = "#76a5f1";
        resetBtn.style.backgroundColor = "#76a5f1";
        body.style.backgroundColor = "rgb(213, 230, 245)";
        timerBox.style.borderColor = "#76a5f1";
        stopWatchBtn.style.borderColor = "none";
        stopWatchBtn.style.backgroundColor = "#a8c7fa";
        pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        isRunning = true;
        stopWatchRingTone.play();
    }
})

resetBtn.addEventListener("click", () => {
    clearInterval(timerId);
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
    resetBtn.style.display = 'none';   
    pauseBtn.style.backgroundColor = "#76a5f1";
    resetBtn.style.backgroundColor = "#76a5f1";
    body.style.backgroundColor = "rgb(213, 230, 245)";
    timerBox.style.borderColor = "#76a5f1";
    stopWatchBtn.style.borderColor = "none";
    stopWatchBtn.style.backgroundColor = "#a8c7fa";
    pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    timerBox.innerHTML = "00:00"
    isRunning = false;
    stopWatchRingTone.pause();
    seconds = 0;
    timerId = null;
    timerBox.style.borderColor = "transparent"
})

volumeBtn.addEventListener("click", () => {
if (!isMuted) {
    isMuted = true;
    stopWatchRingTone.muted = true;
    volumeBtn.querySelector("i").classList.replace('fa-volume-high', 'fa-volume-xmark')
} else {
    isMuted = false;
    stopWatchRingTone.muted = false;
    volumeBtn.querySelector("i").classList.replace('fa-volume-xmark', 'fa-volume-high');
}
})

