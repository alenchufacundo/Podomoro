//functionality
window.onload = () => {
  let currentTime;
  let seconds = 0;

  //pomodoro function
  let workTime;
  let breakTime;
  let restTime;
  let timesCompleted;
  let cyclesGoal;
  let cyclesCompleted;

  const goalReached = () => {
    return cyclesGoal == cyclesCompleted;
  };

  const isRestTime = () => {
    return timesCompleted == 7;
  };

  const pomodoroController = () => {
    if (isRestTime()) {
      cyclesCompleted++;
      if (!goalReached()) {
        currentTime = restTime;
        timer();
        timesCompleted = 0;
      } else {
        console.log("finalizado");
      }
      return;
    }

    if (timesCompleted % 2 == 0) {
      //work
      currentTime = workTime;
      timesCompleted++;
      timer();
    } else {
      //rest
      currentTime = breakTime;
      timesCompleted++;
      timer();
    }
  };

  //timer function
  const timer = () => {
    if (currentTime > 0 || seconds > 0) {
      if (seconds == 0) {
        seconds = 59;
        currentTime--;
      } else {
        seconds--;
      }
      updateClock();
      console.log(currentTime, seconds);
      interval = setTimeout(timer, 1000);
    } else {
      pomodoroController();
      console.log("el temporizador termino");
    }
  };

  //variables

  let clock = document.getElementById("clock");
  let cyclesInput = document.getElementById("cycles-input");
  let startButton = document.getElementById("start-button");
  let workTimeInput = document.getElementById("work-time");
  let breakTimeInput = document.getElementById("break-time");
  let restTimeInput = document.getElementById("rest-time");

  startButton.onclick = () => {
    populateVariables();
    startPomodoro();
  };

  const startPomodoro = () => {
    pomodoroController();
  };

  //asignar variables iniciales
  const populateVariables = () => {
    workTime = workTimeInput.value;
    breakTime = breakTimeInput.value;
    restTime = restTimeInput.value;
    cyclesGoal = cyclesInput.value;
    timesCompleted = 0;
  };

  //clock
  let clockMinutes;
  let clockSeconds;

  const updateClock = () => {
    clockMinutes = formatNumber(currentTime);
    clockSeconds = formatNumber(seconds);
    clock.innerHTML = `${clockMinutes}:${clockSeconds}` 
  }

  const formatNumber = (time) => {
    let formattedDigits;
    if (time < 10){
        formattedDigits = '0' + time;
    } else {
        formattedDigits = time;
    }
    return formattedDigits;
  }

};
