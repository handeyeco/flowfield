// Globals
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const flowField = new FlowField(canvas);
let arrows = [];
let animate = true;
let background = true;

function init() {
  document.addEventListener('keyup', handleKeyPress);
  canvas.addEventListener('click', handleClick);
  // Create columns and rows for arrows
  const columns = 5;
  const rows = 5;
  const colWidth = Math.floor(canvas.width / columns);
  const rowHeight = Math.floor(canvas.height / rows);

  // Create arrow objects
  createArrows(canvas.width / 2, canvas.height / 2);

  animationLoop();
}

function createArrows(x, y) {
  let xMin = x - 50;
  let xMax = x + 50;
  let yMin = y - 50;
  let yMax = y + 50;
  for (let i = 0; i < 10; i++) {
    arrows.push(
      new Arrow(
        canvas,
        Math.floor(Math.random() * (xMax - xMin)) + xMin,
        Math.floor(Math.random() * (yMax - yMin)) + yMin
      )
    )
  }
}

function handleClick(e) {
  createArrows(e.offsetX, e.offsetY);
}

function handleKeyPress(e) {
  if (e.key === 'a') {
    animate = !animate;
    if (animate) animationLoop();
  } else if (e.key === 'h') {
    background = !background;
  }
}

function animationLoop() {
  // console.log(arrows.length);
  let speed = 15;
  // Draw flowfield and get imageData.data
  let pixels = flowField.draw(background);
  // Draw arrows at a rotation that's formulated with red and green values
  // basically r*g*PI*2 where r and g are values between 0 and 1
  // and the result is in radians
  arrows = arrows.filter(arrow => {
    let index = (arrow.x + arrow.y * canvas.width) * 4;
    // These should return a value between -1 and 1
    let xVel = ((pixels[index+1] - 127) / 128) * speed;
    let yVel = ((pixels[index+0] - 127) / 128) * speed;
    // console.log(pixels[index+1]);
    // const angle = (pixels[index+0] / 255) * (pixels[index+1] / 255) * Math.PI * 2;
    let angle = Math.atan2(yVel, xVel) + 90;
    arrow.checkStatus(canvas.width, canvas.height);

    if (arrow.alive) {
      arrow.draw(angle, xVel, yVel);
      return true;
    } else {
      return false;
    }
  });

  if (animate) {
    window.requestAnimationFrame(animationLoop);
  }
}

init();
