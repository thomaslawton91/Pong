var animate = window.requestAnimationFrame || 
              function(callback) { window.setTimeout(callback, 1000/60) };
var canvas = document.createElement('canvas');
var width = 600;
var height = 450;
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext('2d');
var keysDown = {};

window.onload = function(){
  document.body.appendChild(canvas);
  table();
  render();
  window.addEventListener('keydown', function(event){
    keysDown[event.keyCode] = true;
  });
  window.addEventListener('keyup', function(event){
    delete keysDown[event.keyCode];
  });
  animate(step);
  console.log(player.update());
};

var step = function(){
  update();
  render();
  animate(step);
};

var update = function() {
  player.update();
  ball.update(player.paddle, computer.paddle);
};

var render = function() {
  player.render();
  computer.render();
  ball.render();
};

var table = function(){
  ctx.lineWidth = 20;
  ctx.moveTo(50, 0);
  ctx.lineTo(0, 0);
  ctx.lineTo(0, 50);
  ctx.moveTo(550, 0);
  ctx.lineTo(600, 0);
  ctx.lineTo(600, 50);
  ctx.moveTo(600, 400);
  ctx.lineTo(600, 450);
  ctx.lineTo(550, 450);
  ctx.moveTo(50, 450);
  ctx.lineTo(0, 450);
  ctx.lineTo(0, 400);
  ctx.strokeStyle = "white";
  ctx.stroke();
};

function Paddle(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.xSpeed = 0;
  this.ySpeed = 0;
}

Paddle.prototype.render = function(){
  ctx.fillStyle = "white";
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function(x, y){
  this.x += x;
  this.y += y;
  this.xSpeed = x;
  this.ySpeed = y;
  if(this.y <0) {
    this.y = 0;
    this.ySpeed = 0;
  } else if (this.y + this.height > 450){
    this.y = 450 - this.height;
    this.ySpeed = 0;
  }
};

function Player() {
  this.paddle = new Paddle(545, 175, 15, 100);
}

Player.prototype.render = function() {
  this.paddle.render();
};

Player.prototype.update = function(){
  for(var key in keysDown){
    var value = Number(key);
    if(value == 38){
      this.paddle.move(0, -4);
    }else if (value == 40){
      this.paddle.move(0, 4);
    }else {
      this.paddle.move(0, 0);
    }
  }
};

function Computer() {
  this.paddle = new Paddle(40, 175, 15, 100);
}

Computer.prototype.render = function() {
  this.paddle.render();
};

function Ball(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.xSpeed = 3;
  this.ySpeed = 0;
}

Ball.prototype.render = function(){
  ctx.fillStyle = "white";
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

Ball.prototype.update = function(paddle1, paddle2){
  this.x += this.xSpeed;
  this.y += this.ySpeed;
  var topX = this.x - 5;
  var topY = this.y - 5;
  var bottomX = this.x + 5;
  var bottomY = this.y + 5;

  if(this.y - 5 < 0) {
    this.y = 5;
    this.ySpeed = -this.ySpeed;
  } else if(this.y + 5 > 450){
    this.y = 445;
    this.ySpeed = -this.ySpeed;
  }

  if(this.x < 0 || this.x > 600) {
    this.xSpeed = 3;
    this.ySpeed = 0;
    this.x = 300;
    this.y = 200;
  }

  if(topX > 300) {
    if(topX < (paddle1.x + paddle1.width) && bottomX > paddle1.x && topY < (paddle1.y + paddle1.height) && bottomY > paddle1.y) {
      this.ySpeed = -3;
      this.xSpeed += (paddle1.xSpeed / 2);
      this.y += this.ySpeed;
    } 
  } else {
    if(topX < (paddle2.x + paddle2.width) && bottomX > paddle2.x && topY < (paddle2.y + paddle2.height) && bottomY > paddle2.y) {
      this.ySpeed = 3;
      this.xSPeed += (paddle2.xSpeed / 2);
      this.y += this.ySpeed;
    }
  }
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(292.5, 217.5, 15, 15);
console.log(computer, player, ball);