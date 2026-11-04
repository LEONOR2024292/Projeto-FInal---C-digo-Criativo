
let cores;
let indiceCor = 0;
let tempoCor = 0;
let corAtual;
let corSeguinte;

let tempo = 0;

function setup() {
  createCanvas(800, 600);

  background(15, 15, 25);
  colorMode(RGB);
  noFill();

  cores = [
    color(150, 0, 255),   // Roxo
    color(255, 220, 0),   // Amarelo
    color(0, 220, 100),   // Verde
    color(255, 100, 0),   // Laranja
    color(255, 0, 150),   // Rosa
    color(0, 100, 255)    // Azul
  ];

  corAtual = cores[0];
  corSeguinte = cores[1];
}

function draw() {

  // Mudança automática de cores
  tempoCor += 3;

  if (tempoCor >= 100) {
    tempoCor = 0;

    indiceCor = (indiceCor + 1) % cores.length;

    corAtual = cores[indiceCor];
    corSeguinte = cores[(indiceCor + 1) % cores.length];
  }

  let cor = lerpColor(
    corAtual,
    corSeguinte,
    tempoCor / 100
  );

  // Desaparecimento gradual dos vestígios
  noStroke();
  fill(15, 15, 25, 5);
  rect(0, 0, width, height);

  tempo += 0.03;

  // Criar linhas ao movimentar o rato
  if (mouseX !== pmouseX || mouseY !== pmouseY) {

    for (let i = 0; i < 12; i++) {

      let deslocamento = map(i, 0, 11, -30, 30);

      stroke(cor);
      strokeWeight(map(i, 0, 11, 1, 3));

      beginShape();

      for (let t = 0; t <= 1; t += 0.1) {

        let x = lerp(pmouseX, mouseX, t);
        let y = lerp(pmouseY, mouseY, t);

        // Criar ondulação orgânica
        let onda = sin(t * 10 + tempo + i) * 15;

        x += onda;
        y += deslocamento + cos(t * 8 + tempo + i) * 15;

        splineVertex(x, y);
      }

      endShape();
    }
  }
}

// Tecla C limpa a composição
function keyPressed() {

  if (key === "c" || key === "C") {
    background(15, 15, 25);
  }
}
