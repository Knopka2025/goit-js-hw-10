// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



let userSelectedDate = 0;
let timeDifference = 0;

const btnStart = document.querySelector("[data-start]");
const showTime = document.querySelectorAll(".value");
const [days, hours, minutes, seconds] = showTime;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    timeDifference = userSelectedDate - new Date(); 
    if (timeDifference < 1) {
      iziToast.error({
        message: `Please choose a date in the future`,
        position: 'topRight',
      });
      btnStart.disabled = true;
      btnStart.classList.remove(`btn-active`);
      days.innerText = "00";
      hours.innerText = "00";
      minutes.innerText = "00";
      seconds.innerText = "00";
    } else {
      btnStart.disabled = false;
      btnStart.classList.add(`btn-active`);
    }
  },
};

flatpickr("#datetime-picker", options);



btnStart.addEventListener("click", event => {
  event.preventDefault();
  const countdownInterval = setInterval(() => {
    if (timeDifference < 1000) {
      clearInterval(countdownInterval);
      return;
    }
    timeDifference = userSelectedDate - new Date(); 
    btnStart.classList.remove(`btn-active`);

    const convertedTime = convertMs(timeDifference);
    days.innerText = convertedTime.days.toString().padStart(2, '0');
    hours.innerText = convertedTime.hours.toString().padStart(2, '0');
    minutes.innerText = convertedTime.minutes.toString().padStart(2, '0');
    seconds.innerText = convertedTime.seconds.toString().padStart(2, '0');
  }, 1000);
});


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
};



