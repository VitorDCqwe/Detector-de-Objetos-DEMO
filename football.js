let img;
let objects = [];
let modelStatus = false;
let canvas;
let objectDetector;

function preload() {
  img = loadImage('football.jpg');
}

function setup() {
  canvas = createCanvas(img.width, img.height);
  canvas.center();

  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}

function modelLoaded() {
  console.log("Modelo Carregado!");
  modelStatus = true;
  objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  objects = results;
}

function draw() {
  image(img, 0, 0);

  if (modelStatus) {
    for (let i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status: Objeto Detectado";

      let obj = objects[i];

      fill(255, 0, 0);
      textSize(16);
      text(
        `${obj.label} ${floor(obj.confidence * 100)}%`,
        obj.x + 5,
        obj.y + 15
      );

      noFill();
      stroke(255, 0, 0);
      strokeWeight(2);
      rect(obj.x, obj.y, obj.width, obj.height);
    }
  }
}