import flatpickr from 'flatpickr';
import { Report } from 'notiflix/build/notiflix-report-aio';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

let deltaTime = null;

const TIMER_INTERVAL = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const startTime = calendar.now;
    const selectedDate = selectedDates[0];
    deltaTime = selectedDate - startTime;
    console.log('startTime', startTime);
    console.log('selectedDate', selectedDate);
    console.log('deltaTime', deltaTime);

    const isValidDate = deltaTime > 0 ? true : false;
    console.log('isValidDate', isValidDate);

    if (!isValidDate) {
      return Report.failure('Date Failure', 'Please choose a date in the future.', 'Ok');
    }

    console.log('next');
    startBtn.disabled = false;
  },
};

const calendar = flatpickr('input#datetime-picker', options);

startBtn.addEventListener('click', timerStart);

console.log('calendar', calendar);
console.log('startBtn', startBtn);
console.log('daysValue', daysValue);
console.log('hoursValue', hoursValue);
console.log('minutesValue', minutesValue);
console.log('secondsValue', secondsValue);

startBtn.disabled = true;

function timerStart() {
  let timeLeft = deltaTime;
  console.log('timerStart timeLeft', timeLeft);
  const timerID = setInterval(() => {
    timeLeft -= TIMER_INTERVAL;

    if (timeLeft <= 0) {
      timeLeft = 0;
      clearTimeout(timerID);
    }

    const timeLeftArr = convertMs(timeLeft);
    console.log('timeLeft', timeLeftArr);

    daysValue.innerHTML = addLeadingZero(timeLeftArr.days);
    hoursValue.innerHTML = addLeadingZero(timeLeftArr.hours);
    minutesValue.innerHTML = addLeadingZero(timeLeftArr.minutes);
    secondsValue.innerHTML = addLeadingZero(timeLeftArr.seconds);
  }, TIMER_INTERVAL);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
