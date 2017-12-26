// Globals
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const flowField = new FlowField(canvas);
const speed = 15;
let animate = true;
let background = false;
let flowFieldSeed, lines;

function init() {
  document.addEventListener('keyup', handleKeyPress);
  canvas.addEventListener('click', handleClick);
  
  reset();
  animationLoop();
}

function reset() {
  flowFieldSeed = Math.floor(Math.random() * 100) + 0;
  lines = [];
  const columns = 30;
  const rows = 20;
  const colWidth = Math.floor(canvas.width / columns);
  const rowHeight = Math.floor(canvas.height / rows);

  // Create arrow objects
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      lines.push(
        new Line(
          canvas,
          Math.floor(colWidth * x + colWidth),
          Math.floor(rowHeight * y + rowHeight / 2)
        )
      );
    }
  }
}

function handleClick(e) {
  flowFieldSeed = Math.floor(Math.random() * 100) + 0;
}

function handleKeyPress(e) {
  if (e.key === 'a') {
    animate = !animate;
    if (animate) animationLoop();
  } else if (e.key === 'h') {
    background = !background;
  } else if (e.key === 'r') {
    reset();
  }
}

function animationLoop() {
  // Draw flowfield and get imageData.data
  let pixels = flowField.draw(background, flowFieldSeed);
  
  lines.forEach(line => {
    let index = (line.x + line.y * canvas.width) * 4;
    // These should return a value between -1 and 1 * speed
    let xVel = ((pixels[index+1] - 127) / 128) * speed;
    let yVel = ((pixels[index+0] - 127) / 128) * speed;
    
    line.draw(xVel, yVel);
    line.checkEdge(canvas.width, canvas.height);
  });
  
  if (animate) {
    window.requestAnimationFrame(animationLoop);
  }
}

init();
