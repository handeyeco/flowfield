// Globals
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const flowField = new FlowField(canvas);
const speed = 15;
let arrows = [];
let animate = true;
let background = false;

function init() {
  document.addEventListener('keyup', handleKeyPress);
  canvas.addEventListener('click', handleClick);

  // Create arrow objects
  createArrows(canvas.width / 2, canvas.height / 2);

  animationLoop();
}

function createArrows(x, y) {
  let xMin = x - 50;
  let xMax = x + 50;
  let yMin = y - 50;
  let yMax = y + 50;
  // Create 10 arrows near the click event
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
  // Draw flowfield and get imageData.data
  let pixels = flowField.draw(background);
  // Filter through arrows. If they're touching an edge
  // remove them, otherwise keep and draw them
  arrows = arrows.filter(arrow => {
    let index = (arrow.x + arrow.y * canvas.width) * 4;
    // These should return a value between -1 and 1 * speed
    let xVel = ((pixels[index+1] - 127) / 128) * speed;
    let yVel = ((pixels[index+0] - 127) / 128) * speed;
    let angle = Math.atan2(yVel, xVel) + 90;

    // Check to see if they're touching an edge
    let alive = arrow.isAlive(canvas.width, canvas.height);
    if (alive) {
      arrow.draw(angle, xVel, yVel);
    }
    return alive;
  });

  if (animate) {
    window.requestAnimationFrame(animationLoop);
  }
}

init();
