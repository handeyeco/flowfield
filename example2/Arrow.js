class Arrow {
  constructor(canvas, x, y) {
    // Grab canvas references and set x/y
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
  }

  draw(angle = 0, xVel, yVel) {
    let ctx = this.ctx;
    // Maintain previous canvas state
    ctx.save();
    // Change canvas coordinate position and rotation
    ctx.translate(this.x + xVel, this.y + yVel);
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
    this.x += Math.round(xVel);
    this.y += Math.round(yVel);
  }

  isAlive(canvasWidth, canvasHeight) {
    return !(!this.x || !this.y || this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight);
  }
}
