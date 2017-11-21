class FlowField {
  constructor(canvas) {
    // Reference canvas specific variables
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    // Simplex and 3 dimensions of offsets
    this.simplex = new SimplexNoise();
    this.xoff = 0;
    this.yoff = 0;
    this.zoff = 0;

    this.init();
  }

  init() {
    // Due to some wonkiness,
    // can't call getImageData on empty canvas
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  draw(drawBackground){
    if (!drawBackground) {
      this.init();
    }

    // Grab all of the canvas pixels
    let imageData = this.ctx.getImageData(0, 0, this.width, this.height);
    let data = imageData.data;

    // Loop over each pixel
    this.yoff = 0;
    for (var y = 0; y < this.height; y++) {
      this.xoff = 0;
      for (var x = 0; x < this.width; x++) {
        // Canvas store pixels data as a flat array
        // of red, green, blue, and alpha values
        // so: every 4th element is a new pixel
        var index = (x + y * this.width) * 4;
        // Set red and green values using Simplex noise
        // Simplex returns a value between -1 and 1, so we normal as 0 to 1
        // green is pulling Simplex value from different z offset
        var r = this.simplex.noise3D(this.xoff, this.yoff, this.zoff) * 0.5 + 0.5;
        var g = this.simplex.noise3D(this.xoff, this.yoff, this.zoff + 1000) * 0.5 + 0.5;
        // Set colors of pixel
        data[index + 0] = r * 255;
        data[index + 1] = g * 255;
        data[index + 2] = 0;
        this.xoff += 0.005;
      }
      this.yoff += 0.005;
    }
    this.zoff += 0.08;

    if (drawBackground) {
      // Draw pixels to canvas
      this.ctx.putImageData(imageData, 0, 0);
    }

    // Return pixel data so it can be used to set arrow direction
    return data;
  }
}
