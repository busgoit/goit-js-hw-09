import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  formSubmitBtn: document.querySelector('button[type="submit"]'),
};

let promisesData = {};

refs.form.addEventListener('input', onFormInput);
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  switch (event.target) {
    case refs.form.delay:
      promisesData.delay = Number(refs.form.delay.value);
      break;

    case refs.form.step:
      promisesData.step = Number(refs.form.step.value);
      break;

    case refs.form.amount:
      promisesData.amount = Number(refs.form.amount.value);
      break;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  generatePromises(promisesData);
}

function generatePromises({ delay, step, amount }) {
  for (let position = 1; position <= amount; position += 1) {
    createPromise({ position, delay })
      .then(({ position, delay }) => {
        onPromiseResolve(position, delay);
      })
      .catch(({ position, delay }) => {
        onPromiseReject(position, delay);
      });
    delay += step;
  }
}

function createPromise({ position, delay }) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseResolve(position, delay) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onPromiseReject(position, delay) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
}
