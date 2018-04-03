
setInterval(onTimerTick, 1); // 33 milliseconds = ~ 30 frames per sec

let isRunning = false;
let escapestate = false;
let colormode = 1;

const button = document.getElementById('accept');

button.addEventListener('click', clickEvent);

const box = document.getElementById('box');

box.addEventListener('change', boxlistener);


function onTimerTick() {
  if (isRunning && !escapestate) {
    const canvas = document.getElementById('canv');
    switch (colormode) {
      case 1:
        drawOneColor(canvas);
        break;
      case 2:
        drawPixelColor(canvas);
        break;
      default:
    }
  }
}


function drawOneColor(canvas) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i] = r;
    imageData.data[i + 1] = g;
    imageData.data[i + 2] = b;
    imageData.data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
}

function drawPixelColor(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.canvas.width = window.innerWidth / 2;
  ctx.canvas.height = window.innerHeight / 2;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    imageData.data[i] = r;
    imageData.data[i + 1] = g;
    imageData.data[i + 2] = b;
    imageData.data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
}


function clickEvent() {
  isRunning = true;

  const elem = document.getElementById('warning');
  const canv = document.getElementById('canv');
  canv.style.display = 'block';
  elem.parentNode.removeChild(elem);
}
function boxlistener() {
  const select = document.getElementById('box');
  switch (select.options[select.selectedIndex].value) {
    case 'FullColor':
      colormode = 1;
      break;
    case 'pixel':
      colormode = 2;
      break;
    default:
      colormode = 0;
      break;
  }
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Escape') {
    escapestate = !escapestate;
  }

  if (escapestate) {
    document.getElementById('escape').style.display = 'block';
  } else {
    document.getElementById('escape').style.display = 'none';
  }
});