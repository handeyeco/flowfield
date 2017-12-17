// Globals
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const flowField = new FlowField(canvas);
const arrows = [];
let animate = true;
let background = true;

function init() {
  document.addEventListener('keyup', handleKeyPress);
  // Create columns and rows for arrows
  const columns = 30;
  const rows = 20;
  const colWidth = Math.floor(canvas.width / columns);
  const rowHeight = Math.floor(canvas.height / rows);

  // Create arrow objects
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      arrows.push(
        new Arrow(
          canvas,
          Math.floor(colWidth * x + colWidth),
          Math.floor(rowHeight * y + rowHeight / 2)
        )
      );
    }
  }

  animationLoop();
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
  const pixels = flowField.draw(background);
  // Draw arrows at a rotation that's formulated with red and green values
  // basically r*g*PI*2 where r and g are values between 0 and 1
  // and the result is in radians
  arrows.forEach(arrow => {
    const index = (arrow.x + arrow.y * canvas.width) * 4;
    // const angle = (pixels[index+0] / 255) * (pixels[index+1] / 255) * Math.PI * 2;
    const angle = Math.atan2(pixels[index+0] / 255, pixels[index+1] / 255) * Math.PI * 2;
    arrow.draw(angle);
  });

  if (animate) {
    window.requestAnimationFrame(animationLoop);
  }
}

init();
