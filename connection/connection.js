var connectionSketch = function(p) {
  let stars = [];
  let numStars = 500;
  let meteors = [];
  let numMeteors = 1;
  let moon;
  let img;

  p.preload = function() {
    img = p.loadImage("connection/image/fire.png");
  };

  p.setup = function() {
    let canvas = p.createCanvas(500, 380);
    canvas.parent('connection-container');
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star(p));
    }

    for (let i = 0; i < numMeteors; i++) {
      meteors.push(new Meteor(p));
    }

    moon = new Moon(p);
  };

  p.draw = function() {
    setGradient(0, 0, p.width, p.height, p.color(10, 32, 78), p.color(16, 62, 128));
    p.image(img, 200, 250);

    for (let star of stars) {
      star.twinkle();
      star.display();
    }

    for (let meteor of meteors) {
      meteor.move();
      meteor.display();
    }

    moon.display();
  };

  function setGradient(x, y, w, h, c1, c2) {
    p.noFill();
    for (let i = y; i <= y + h; i++) {
      let inter = p.map(i, y, y + h, 0, 1);
      let c = p.lerpColor(c1, c2, inter);
      p.stroke(c);
      p.line(x, i, x + w, i);
    }
  }

  class Star {
    constructor(p) {
      this.p = p;
      this.x = p.random(p.width);
      this.y = p.random(p.height - 150);
      this.size = p.random(1, 3);
      this.color = p.color(255, 255, 255);
      this.twinkleSpeed = p.random(0.5, 2);
    }

    twinkle() {
      let brightness = this.p.map(this.p.sin(this.p.frameCount * this.twinkleSpeed), -1, 1, 100, 255);
      this.color.setAlpha(brightness);
    }

    display() {
      this.p.fill(this.color);
      this.p.noStroke();
      this.p.ellipse(this.x, this.y, this.size, this.size);
    }
  }

  class Meteor {
    constructor(p) {
      this.p = p;
      this.reset();
    }

    move() {
      this.x -= this.speed;
      this.y += this.speed;

      if (this.x < 0 || this.y > this.p.height - 150) {
        this.reset();
      }
    }

    display() {
      this.p.stroke(255);
      this.p.strokeWeight(2);
      this.p.line(this.x, this.y, this.x + this.length, this.y - this.length);
    }

    reset() {
      this.x = this.p.random(this.p.width * 0.8, this.p.width);
      this.y = this.p.random(this.p.height * 0.1);
      this.length = this.p.random(5, 15);
      this.speed = this.p.random(2, 6);
    }
  }

  class Moon {
    constructor(p) {
      this.p = p;
      this.x = p.width * 0.85;
      this.y = p.height * 0.2;
      this.size = 50;
    }

    display() {
      this.p.fill(255);
      this.p.ellipse(this.x, this.y, this.size);
    }
  }
};

//new p5(connectionSketch, 'connection-container');
