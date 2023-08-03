const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const AMOUNT_TIMER_SYMBOL = 2;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;
const TIMER_STEP = 1000;

const formatTimerVal = (val) => {
  return val.length < AMOUNT_TIMER_SYMBOL ? '0' + val : val;
}

const getCurrentTime = (seconds) => {
  let hh = String(Math.floor(seconds / SECONDS_IN_HOUR));
  let mm = String(Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE));
  let ss = String(Math.floor(seconds % SECONDS_IN_MINUTE));
  
  return formatTimerVal(hh) + ':' + formatTimerVal(mm) + ':' + formatTimerVal(ss);
}

const createTimerAnimator = () => {
  return (seconds) => {
    let currentTime = seconds;
    timerEl.textContent = getCurrentTime(currentTime);
    let timerId = setInterval(() => {
      if (currentTime === 0) {
        clearInterval(timerId);
        return;
      }
      currentTime--;
      timerEl.textContent = getCurrentTime(currentTime);
    }, TIMER_STEP);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (evt) => {
  const inputVal = inputEl.value;
  let inputNumbers = '';
  for (let i = 0; i < inputVal.length; i++) {
    if (Number.isInteger(Number(inputVal[i]))) {
      inputNumbers = inputNumbers.concat(inputVal[i]);
    }
  }
  inputEl.value = inputNumbers;
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
