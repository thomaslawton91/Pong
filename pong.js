var animate = window.requestAnimationFrame || 
              function(callback) { window.setTimeout(callback, 1000/60);};
var canvas = document.createElement('canvas');
var width = 600;
var height = 450;
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext('2d');
var player = new Player();
var computer = new Computer();
var speeds = [-3, 3];
var randSpeedX = speeds[Math.floor(Math.random() * 2|0)];
var randSpeedY = speeds[Math.floor(Math.random() * 2|0)];
var ball = new Ball(292.5, 217.5, 15, 15, randSpeedX, randSpeedY);
console.log(computer, player, ball);
var keysDown = {};

var update = function() {
  player.update();
  ball.update(player.paddle, computer.paddle);
};

var step = function(){
  update();
  render();
  animate(step);
};

var render = function() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 600, 450);
  table();
  player.render();
  computer.render();
  ball.render();
};

var table = function(){
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.moveTo(50, 0);
  ctx.lineTo(0, 0);
  ctx.lineTo(0, 50);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(550, 0);
  ctx.lineTo(600, 0);
  ctx.lineTo(600, 50);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(600, 400);
  ctx.lineTo(600, 450);
  ctx.lineTo(550, 450);
  ctx.stroke();

  ctx.beginPath();
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

//Computer.prototype.update() = function() {
  
//};

function Ball(x, y, width, height, speedX, speedY){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = speedX;
  this.y_speed = speedY;
}


Ball.prototype.render = function(){
  ctx.fillStyle = "white";
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var leftX = this.x;
  var topY = this.y;
  var rightX = this.x + this.width;
  var botY = this.y + this.height;
  if(this.x < 0 || this.x > 600){
    this.x_speed = -2;//speeds[Math.floor(Math.random() * 2|0)];
    this.y_speed = 0;//speeds[Math.floor(Math.random() * 2|0)];
    this.x = 292.5;
    this.y = 217.5;
  }

  if(this.y < 0){
    this.y = 1;
    this.y_speed = -this.y_speed;
  } else if(this.y > 435){
    this.y_speed = -this.y_speed;
  }


  if(this.x > 300){
    if(leftX < (paddle1.x + paddle1.width) && rightX > paddle1.x && topY > paddle1.y && botY < paddle1.y + paddle1.height){
          this.x_speed = -this.x_speed;
          this.y_speed = -this.y_speed;
        } 
  } else if (this.x < 300) {
      if (leftX < (paddle2.x + paddle2.width) &&  rightX > (paddle2.x + paddle2.width) && topY > paddle2.y && botY < paddle2.y + paddle2.height){
        this.x_speed = -this.x_speed;
        this.y_speed = -this.y_speed;
      }
    }
};

window.onload = function(){
  document.body.appendChild(canvas);
  render();
  window.addEventListener('keydown', function(event){
    keysDown[event.keyCode] = true;
  });
  window.addEventListener('keyup', function(event){
    delete keysDown[event.keyCode];
  });
  animate(step);
};