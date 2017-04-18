function initGame(canvasElement) {
  canvasElement = document.createElement("canvas");
  canvasElement.id = "pong";
  document.body.appendChild(canvasElement);
  canvas.width = 600;
  canvas.height = 450;
  var canvas = document.getElementById("pong");
  var context = canvas.getContext("2d");
};
