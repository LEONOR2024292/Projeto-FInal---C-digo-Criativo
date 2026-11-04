
let img;
let fragmentos = [];
let espacamento = 12;

function preload() {
  img = loadImage("memoria.jpg");
}

function setup() {
  createCanvas(800, 600);

  img.resize(width, height);
  img.loadPixels();

  // Criar fragmentos a partir dos píxeis da imagem
  for (let y = 0; y < height; y += espacamento) {
    for (let x = 0; x < width; x += espacamento) {

      let indice = 4 * (y * img.width + x);

      let r = img.pixels[indice];
      let g = img.pixels[indice + 1];
      let b = img.pixels[indice + 2];

      fragmentos.push({
        x: x,
        y: y,
        cor: color(r, g, b),
        tamanho: random(4, 8),
        deslocamento: random(15, 40)
      });
    }
  }

  noStroke();
}

function draw() {
  background(15, 15, 25);

  for (let f of fragmentos) {

    let distancia = dist(mouseX, mouseY, f.x, f.y);

    let xFinal = f.x;
    let yFinal = f.y;

    if (distancia < 150) {

      let angulo = atan2(f.y - mouseY, f.x - mouseX);

      let intensidade = map(distancia, 0, 150, 1, 0);

      xFinal += cos(angulo) * f.deslocamento * intensidade;
      yFinal += sin(angulo) * f.deslocamento * intensidade;
    }

    fill(f.cor);
    circle(xFinal, yFinal, f.tamanho);
  }

  fill(255, 180);
  textSize(12);
  textAlign(LEFT);
  text("MEMÓRIA EM FRAGMENTOS", 20, height - 25);
}

function mousePressed() {
  for (let f of fragmentos) {
    f.deslocamento = random(20, 80);
  }
}
