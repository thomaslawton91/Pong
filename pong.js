var Paddle = function(player, x, y, width, height){
  this.player = player;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};

Paddle.prototype.render = function(context){
  context.fillStyle = 'white';
  context.fillRect(this.x, this.y, this.width, this.height);
};

var Ball = function(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};

Ball.prototype.render = function(context){
  context.fillStyle = 'white';
  context.fillRect(this.x, this.y, this.width, this.height);
};

var ball = new Ball (292.5, 217.5,15, 15);
console.log(ball);

var player = new Paddle("Player", 545, 175, 15, 100);
console.log(player);

var computer = new Paddle("Computer", 40, 175, 15, 100);
console.log(computer);

window.onload = function(){
  var canvasElement = document.createElement("canvas");
  canvasElement.id = "pong";
  document.body.appendChild(canvasElement);
  var canvas = document.getElementById("pong");
  canvas.width = 600;
  canvas.height = 450;
  var context = canvas.getContext("2d");
  context.lineWidth = 10;
  context.moveTo(50, 0);
  context.lineTo(0, 0);
  context.lineTo(0, 50);
  context.moveTo(550, 0);
  context.lineTo(600, 0);
  context.lineTo(600, 50);
  context.moveTo(600, 400);
  context.lineTo(600, 450);
  context.lineTo(550, 450);
  context.moveTo(50, 450);
  context.lineTo(0, 450);
  context.lineTo(0, 400);
  context.strokeStyle = "white";
  context.stroke();

  ball.render(context);
  player.render(context);
  computer.render(context);
};