const pomodoro = document.getElementById("timer");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");

startButton.addEventListener('click', () => {
    toggleClock();
})

pauseButton.addEventListener('click', () => {
    toggleClock();
})

stopButton.addEventListener('click', () => {
    toggleClock(true);
})

let isClockRunning = false;
let workDuration = 1500;
let currentTimeLeft = 1500;
let breakDuration = 300;
let longBreakDuration = 600;
let type = "Work";
let timeSpent = 0;

const toggleClock = (reset) => {
    if (reset) {
        stopClock();
    } else {
        if (isClockRunning == true) {
            clearInterval(clockTimer);
            isClockRunning = false;
        } else {
            isClockRunning = true;
            clockTimer = setInterval(() => {
                stepDown();
            }, 1000);
        }
    }
};

const displayTimeLeft = () => {
    const secondsLeft = currentTimeLeft;
    let result = '';
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft / 60);
    let hours = parseInt(secondsLeft / 3600);

    function addZeroes(time) {
        return (time < 10) ? `0${time}` : time
    }
    if (hours > 0) result += `${hours}`
    result += `${addZeroes(minutes)}:${addZeroes(seconds)}`
    pomodoro.innerText = result.toString();
}

const stopClock = () => {
    sessionLog(type);
    clearInterval(clockTimer);
    isClockRunning = false;
    displayTimeLeft();
    type = type === "Work" ? "Break" : "Work";
    currentTimeLeft = type === "Work" ? workDuration : breakDuration;
}

const stepDown = () => {
    if (currentTimeLeft > 0) {
        currentTimeLeft--;
        timeSpent++;
    } else if (currentTimeLeft >= 0) {
        if (type == "Work") {
            type = "Break";
            currentTimeLeft = breakDuration;
            timeSpent = 0;
        } else {
            type = "Work";
            currentTimeLeft = workDuration;
        }
        
    }
    displayTimeLeft();
}

const sessionLog = (type) => {
    const sessionList = document.querySelector("#sessions");
    const li = document.createElement('li');
    let sessionLabel = type;
    let elapsedTime = parseInt(timeSpent/60)
    elapsedTime = elapsedTime > 0 ? elapsedTime : '< 1';

    const text = document.createTextNode(`${sessionLabel}: ${elapsedTime} min`);
    li.appendChild(text);
    sessionList.appendChild(li);
}