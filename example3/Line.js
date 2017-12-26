class Line {
  constructor(canvas, x, y) {
    // Grab canvas references and set x/y
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.points = [ [x,y] ];
    this.x = x;
    this.y = y;
  }

  draw(xVel, yVel) {
    // Add newest point
    this.x += Math.floor(5 + xVel / 4);
    this.y += Math.floor(5 + yVel / 4);
    this.points.push([this.x, this.y]);
    
    // Draw line using collection of points
    ctx.fillStyle = '#000';
    ctx.beginPath();
    this.points.forEach((point, idx) => {
      if (idx === 0) {
        ctx.moveTo(point[0], point[1]);
      } else {
        ctx.lineTo(point[0], point[1]);
      }
    });
    ctx.stroke();
    
    // Remove oldest point
    if (this.points.length > 6) {
      this.points.shift();
    }
  }
  
  checkEdge(width, height) {
    // check if it's on canvas x
    if (this.x <= 0) {
      this.x = width;
      this.points = [];
    } else if (this.x >= width) {
      this.x = 0;
      this.points = [];
    }
    // check if it's on canvas y
    if (this.y <= 0) {
      this.y = height;
      this.points = [];
    } else if (this.y >= height) {
      this.y = 0;
      this.points = [];
    }
  }
}
