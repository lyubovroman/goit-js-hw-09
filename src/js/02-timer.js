import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  btnStartEl: document.querySelector('[data-start]'),
  dateEl: document.querySelector('[data-days]'),
  hourEl: document.querySelector('[data-hours]'),
  minEl: document.querySelector('[data-minutes]'),
  secEl: document.querySelector('[data-seconds]')

}

refs.btnStartEl.addEventListener('click', onStartBtnClick)

  
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const isChosenDate = dateOptions();
    if (isChosenDate < 0) {
      
      Notiflix.Notify.failure('please choose valid date');
      return;
    } 
    
    Notiflix.Notify.success('Удача, press "Начало"');
    refs.btnStartEl.disabled = false;
    
  },
};

flatpickr(refs.inputEl, options)

function clockRestruct({ days, hours, minutes, seconds }) {
  refs.dateEl.textContent = days;
  refs.hourEl.textContent = hours;
  refs.minEl.textContent = minutes;
  refs.secEl.textContent = seconds;
}

function onStartBtnClick(event) {
 
  refs.btnStartEl.disabled = true;
  refs.inputEl.disabled = true;
  
  setInterval(() => {
    const changeOfTimeInterface = dateOptions();
    
    if (changeOfTimeInterface < 0) {
      return
    }
    const timeComponents = convertMs(changeOfTimeInterface);
    return clockRestruct(timeComponents);
    
  }, 1000)
  
};

function dateOptions(event) {
  const inputData = selectedDate;
  const currentTime = Date.now();
  const deltaTime = inputData - currentTime;
  return deltaTime;
};


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

