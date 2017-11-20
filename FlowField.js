class FlowField {
  constructor(canvas, animating = false) {
    this.animating = animating;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.simplex = new SimplexNoise();

    this.xoff = 0;
    this.yoff = 0;
    this.zoff = 0;
    this.rtime = 0;
    this.gtime = 0;

    this.width = canvas.width;
    this.height = canvas.height;

    this.init();
  }

  init() {
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  toggleAnimation() {
    this.animating = !this.animating;
    if (this.animating) this.animate();
  }

  draw(){
    let imageData = this.ctx.getImageData(0, 0, this.width, this.height);
    let data = imageData.data;

    this.yoff = 0;
    for (var y = 0; y < this.height; y++) {
      this.xoff = 0;
      for (var x = 0; x < this.width; x++) {
        var index = (x + y * this.width) * 4;
        var r = this.simplex.noise3D(this.xoff, this.yoff, this.zoff) * 0.5 + 0.5;
        var g = this.simplex.noise3D(this.xoff, this.yoff, this.zoff + 1000) * 0.5 + 0.5;
        data[index + 0] = r * 255;
        data[index + 1] = g * 255;
        data[index + 2] = 0;
        this.xoff += 0.005;
      }
      this.yoff += 0.005;
    }

    this.zoff += 0.08;

    this.ctx.putImageData(imageData, 0, 0);

    // if (this.animating) {
    //   window.requestAnimationFrame(this.animate.bind(this));
    // }

    return data;
  }
}
