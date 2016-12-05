var img;
var songs = [];
var h = 0;
var arr = [];
var isDog = false;

function setup() {
  createCanvas(400, 400);
  img = loadImage("duck.png");
  songs[0] = loadSound("Quack Sound Effect - Gutlacky.mp3");
  songs[1] = loadSound("bark.mp3");
  // .setVolume(0.1);
  //mySound.play();
  //mySound2.setVolume(0.1);
  //mySound2.play();
  noStroke();
  colorMode(HSB, 400);
  for (i = 0; i < width; i++) {
    for (j = 0; j < height; j++) {
      stroke(i, j, 400);
      //point(i, j);
    }
  }
}

function draw() {
  background(frameCount % 400, 400, 400);
  for (var i = 0; i < arr.length; i++) {
    var xy = arr[i];
    image(img, xy.x, xy.y, img.width / 50, img.height / 50);
  }

}


function xypoint(x, y) {
  this.x = x;
  this.y = y;
}

function mouseMoved() {
  //image(img, 0, height / 50, img.width / 50, img.height / 50);
  var pointt = new xypoint(mouseX, mouseY);
  arr.push(pointt);
  // console.log(arr);
}

function preload() {
  //mySound = loadSound("Quack Sound Effect - Gutlacky.mp3");
  img = loadImage("duck.png");
  //mySound2 = loadSound("bark.mp3");
}

function mouseClicked() {
  if (isDog === false) {
    if (songs[0].isPlaying()) {
      songs[0].stop();
    } else {
      songs[0].play();
    }
  } else {
    if (songs[1].isPlaying()) {
      songs[1].stop();
    } else {
      songs[1].play();
    }
  }
  //return true;
  // if (songs[0].isPlaying()) {
  //   songs[0].stop();
  // }
  // else {
  //   songs[0].play();
  // }

}


function xypoint(x, y) {
  this.x = x;
  this.y = y;
}

function keyTyped() {

  if (isDog === true) {
    isDog = false;
    img = loadImage("duck.png");
  } else {
    isDog = true;
    img = loadImage("dog.png");
  }
}