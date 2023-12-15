const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 30;
    this.color = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
    this.velocityY = 0;
    this.gravity = 0.8;
    this.damping = 0.8;
  }

  colorArray = [
    '#3B7A57',
    '#7C0A02',
    '#FAE7B5',
    '#FF91AF',
    '#9F8170'
  ];

 
  update() {
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    if (this.y + this.radius >= innerHeight) {
      this.velocityY *= -this.damping;
      this.y = innerHeight - this.radius;
    }

    this.draw();
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
}



function createBall(x, y) {
  const ball = new Ball(x, y);
  balls.push(ball);
}

function handleCanvasClick(event) {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;

  createBall(mouseX, mouseY);
}

canvas.addEventListener('click', handleCanvasClick);

function animate() {
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (const ball of balls) {
    ball.update();
  }
  requestAnimationFrame(animate);
}

animate();
