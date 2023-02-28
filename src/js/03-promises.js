import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const delay = formEl.delay.value;
  const step = formEl.step.value;
  const amount = formEl.amount.value;

  function createPromise(position, delay) {
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

    for (let i = 0; i < amount; i += 1) {
        const position = i;
        const newDelay = delay + position * step;
    createPromise(position, newDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}




// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// const form = document.querySelector('.form');

// form.addEventListener('submit', event => {
//   event.preventDefault();
//   const delay = parseInt(form.elements.delay.value);
//   const step = parseInt(form.elements.step.value);
//   const amount = parseInt(form.elements.amount.value);

//   for (let i = 0; i < amount; i++) {
//     createPromise(i, delay + i * step)
//       .then(result => console.log(`Promise ${result.position} with delay ${result.delay} fulfilled`))
//       .catch(result => console.log(`Promise ${result.position} with delay ${result.delay} rejected`));
// //   }
// // });



