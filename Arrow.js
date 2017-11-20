class Arrow {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
  }

  draw(angle) {
    let ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = '#000';
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-1.5, 0);
    ctx.lineTo(-1.5, 5);
    ctx.lineTo(1.5, 5);
    ctx.lineTo(1.5, 0);
    ctx.lineTo(5, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
