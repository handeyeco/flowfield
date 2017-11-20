const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const flowField = new FlowField(canvas);
const arrows = [];
let animate = false;

function init() {
  canvas.addEventListener('click', toggleAnimation);
  const columns = 30;
  const colWidth = Math.floor(canvas.width / columns);
  const rows = 20;
  const rowHeight = Math.floor(canvas.height / rows);

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

  console.log(arrows);

  animationLoop();
}

function toggleAnimation() {
  animate = !animate;
  if (animate) animationLoop();
}

function animationLoop() {
  const pixels = flowField.draw();
  arrows.forEach(arrow => {
    const index = (arrow.x + arrow.y * canvas.width) * 4;
    const angle = pixels[index+0] / 255 * pixels[index+1] / 255 * Math.PI * 2;
    arrow.draw(angle);
  });

  if (animate) {
    window.requestAnimationFrame(animationLoop);
  }
}

init();
