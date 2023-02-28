const refs = {
btnStart : document.querySelector('[data-start]'),
btnStop : document.querySelector('[data-stop]'),
bodyEl :document.querySelector('body')
}



refs.btnStart.addEventListener('click', onStartClick);
refs.btnStop.addEventListener('click', onStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;

function changeBodyColor() {
  refs.bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
}

function onStartClick(event) {
  refs.btnStart.disabled = true;
 intervalId = setInterval(() => {
    changeBodyColor();
  }, 1000);
  refs.btnStop.disabled = false;
}

function onStopClick(event) {
  clearInterval(intervalId);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
}



