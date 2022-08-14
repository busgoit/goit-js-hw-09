import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// const dateInput = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
let deltaTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const startTime = Date.now();
    const selectedDate = selectedDates[0].getTime();
    deltaTime = selectedDate - startTime;
    console.log('startTime', startTime);
    console.log('selectedDate', selectedDate);
    console.log('deltaTime', deltaTime);

    const isValidDate = deltaTime > 0 ? true : false;
    console.log('isValidDate', isValidDate);

    if (!isValidDate) {
      return window.alert('Please choose a date in the future');
    }

    console.log('next');
    startBtn.disabled = false;
  },
};
const calendar = flatpickr('input#datetime-picker', options);

// console.log('dateInput', dateInput);
console.log('startBtn', startBtn);

startBtn.disabled = true;

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  padStart();
}
