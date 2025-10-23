const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let paddle = { w: 100, h: 12, x: WIDTH/2 - 50, y: HEIGHT - 30, speed: 6 };
let ball = { x: WIDTH/2, y: HEIGHT/2, r: 8, vx: 3*(Math.random()>0.5?1:-1), vy: -3 };
let leftPressed = false, rightPressed = false;
let score = 0;
let running = true;

function drawPaddle(){
  ctx.fillStyle = '#06b6d4';
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
  ctx.fillStyle = '#f472b6';
  ctx.fill();
  ctx.closePath();
}

function draw(){
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  drawPaddle();
  drawBall();
}

function update(){
  if(leftPressed) paddle.x -= paddle.speed;
  if(rightPressed) paddle.x += paddle.speed;
  paddle.x = Math.max(0, Math.min(WIDTH - paddle.w, paddle.x));

  ball.x += ball.vx;
  ball.y += ball.vy;

  // Colisiones con paredes
  if(ball.x - ball.r < 0 || ball.x + ball.r > WIDTH) ball.vx *= -1;
  if(ball.y - ball.r < 0) ball.vy *= -1;

  // Colisión con pala
  if(ball.y + ball.r >= paddle.y && ball.x >= paddle.x && ball.x <= paddle.x + paddle.w){
    ball.vy *= -1;
    // aumentar velocidad ligeramente
    ball.vx *= 1.05;
    ball.vy *= 1.05;
    score += 1;
    document.getElementById('score').textContent = 'Puntuación: ' + score;
  }

  // Si se cae
  if(ball.y - ball.r > HEIGHT){
    running = false;
  }
}

function loop(){
  if(running){
    update();
    draw();
    requestAnimationFrame(loop);
  } else {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    ctx.fillStyle = '#fff';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over - Puntuación: ' + score, WIDTH/2, HEIGHT/2 - 10);
    ctx.fillText('Pulsa R para reiniciar', WIDTH/2, HEIGHT/2 + 20);
  }
}

function reset(){
  paddle.x = WIDTH/2 - paddle.w/2;
  ball.x = WIDTH/2;
  ball.y = HEIGHT/2;
  ball.vx = 3*(Math.random()>0.5?1:-1);
  ball.vy = -3;
  score = 0;
  running = true;
  document.getElementById('score').textContent = 'Puntuación: ' + score;
  loop();
}

// Eventos
window.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') leftPressed = true;
  if(e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') rightPressed = true;
  if(e.key === 'r' || e.key === 'R') reset();
});
window.addEventListener('keyup', (e) => {
  if(e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') leftPressed = false;
  if(e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') rightPressed = false;
});

document.getElementById('restart').addEventListener('click', reset);

loop();