
let img;
let fragmentos = [];
let espacamento = 8;

function preload() {
  img = loadImage("memoria.jpg");
}

function setup() {
  createCanvas(800, 600);

  img.resize(width, height);

  // Criar os fragmentos a partir da imagem
  for (let y = 0; y < height; y += espacamento) {
    for (let x = 0; x < width; x += espacamento) {

      let cor = img.get(x, y);

      fragmentos.push({
        x: x,
        y: y,
        cor: cor,
        tamanho: random(2, 5),
        deslocamento: random(10, 40)
      });
    }
  }

  noStroke();
}

function draw() {
  background(15, 15, 25);

  for (let f of fragmentos) {

    // Distância entre o rato e cada fragmento
    let distancia = dist(mouseX, mouseY, f.x, f.y);

    let xFinal = f.x;
    let yFinal = f.y;

    // O rato provoca a dispersão dos fragmentos
    if (distancia < 120) {

      let angulo = atan2(f.y - mouseY, f.x - mouseX);

      let intensidade = map(distancia, 0, 120, 1, 0);

      xFinal += cos(angulo) * f.deslocamento * intensidade;
      yFinal += sin(angulo) * f.deslocamento * intensidade;
    }

    // Desenhar cada fragmento
    fill(f.cor);
    circle(xFinal, yFinal, f.tamanho);
  }

  // Texto do projeto
  fill(255, 150);
  textSize(12);
  textAlign(LEFT);
  text("MEMÓRIA EM FRAGMENTOS", 20, height - 25);
}

function mousePressed() {

  // O clique aumenta temporariamente a dispersão
  for (let f of fragmentos) {
    f.deslocamento = random(20, 80);
  }
}
