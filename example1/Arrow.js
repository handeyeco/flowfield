class Arrow {
  constructor(canvas, x, y) {
    // Grab canvas references and set x/y
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
  }

  draw(angle = 0) {
    let ctx = this.ctx;
    // Maintain previous canvas state
    ctx.save();
    // Change canvas coordinate position and rotation
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    // Draw arrow
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-1.5, 0);
    ctx.lineTo(-1.5, 5);
    ctx.lineTo(1.5, 5);
    ctx.lineTo(1.5, 0);
    ctx.lineTo(5, 0);
    ctx.closePath();
    ctx.fillStyle = '#000';
    ctx.fill();
    // Restore to previous canvas state
    ctx.restore();
  }
}
