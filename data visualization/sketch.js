var data;
var crayon = [];

function preload() {
  data = loadJSON("crayola.json");

}

function setup() {
  colorMode(HSB, 255);
  console.log(data.colors);
  createCanvas(600, 600, WEBGL);
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 12; j++) {
      crayon[i + j * 10] = new Crayon(i * 50 + 25, j * 50, data.colors[i + j * 10].color, data.colors[i + j * 10].hex);
    }
  }
}

function draw() {
  background(255);
  var newcolor = avgcolor();
  push();
  translate(270, 50, 0);
  rotateX(160.2);
  fill(0);
  cylinder(20, 100);
  //rotateX(178.9);
  translate(0, 63, 0);
  fill(newcolor);
  cone(20, 25);
  pop();
  translate(400, 400, 0);
  for (i = 0; i < crayon.length; i++) {
    crayon[i].display();
  }
  for (i = 0; i < crayon.length; i++) {
    crayon[i].contains();
  }
}

function Crayon(x, y, name, c) {
  this.width = 25;
  this.name = name;
  this.colors = color(c);
  this.x = x;
  this.y = y;
  this.contains = function() {

    if (mouseX > this.x + 25 && mouseX < this.x + this.width + 25 && mouseY > this.y && mouseY < this.y + this.width) {
      console.log(this.name);
    }
  }
  this.display = function() {
    push();
    translate((this.x - 590) * 1.2, this.y - 660, -110);
    fill(0);
    cylinder(22, this.y + 100);
    pop();

    push();
    translate(this.x - 656, this.y - 675, 0);
    fill(this.colors);
    rotateX(179.2);
    cone(20, 25);
    pop();

  }
}
//https://gist.github.com/paulirish/357048
function avgcolor() {

  var r = 0;
  var g = 0;
  var b = 0;

  for (var i = 0; i < crayon.length; i++) {
    var num = crayon[i].colors;
    r += red(num);
    g += green(num);
    b += blue(num);
  }
  r /= 120;
  g /= 120;
  b /= 120;


  //console.log(red + " " + green + " " + blue);
  //var res = '#' + hex(r(red),g(green),b(blue));
  var res = color(r, g, b);

  return res;
}