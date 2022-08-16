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
  let { delay, step, amount } = promisesData;

  for (let position = 1; position <= amount; position += 1) {
    // console.log('position', position);
    // console.log('delay', delay);

    createPromise(position, delay);

    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

createPromise()
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
