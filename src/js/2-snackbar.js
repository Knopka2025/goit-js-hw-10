// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const dateForm = document.querySelector(".form");



dateForm.addEventListener('submit', event => {
  event.preventDefault();
  const delay = event.currentTarget.elements.delay.value;
  const state = event.currentTarget.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state ==="fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

promise
  .then(value => {
    iziToast.success({  
      position: "topRight",
      message: `✅ Fulfilled promise in ${delay}ms`
  })
  })
  .catch(error => {
    iziToast.error({ 
      position: "topRight",          
      message: `❌ Rejected promise in ${delay}ms`
  })
  });
});