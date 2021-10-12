const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

const width = 300;
const height = 300;

const TEA_COLORS = ["rgb(20, 20, 20)", "rgb(25, 33, 27)"];

for (let i = 0; i < 11; i++) brewTea();

function brewTea() {
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  loadImage(path.resolve(__dirname, "assets", "cup.png")).then((image) => {
    context.drawImage(image, 0, 0);

    const numLeaves = randInt(100, 1000);
    for (let i = 0; i < numLeaves; i++) {
      dropLeaf(context);
    }

    loadImage(path.resolve(__dirname, "assets", "cup-mask-rough.png")).then(
      (image) => {
        context.drawImage(image, 0, 0);
        const buffer = canvas.toBuffer("image/png");
        saveImg(buffer);
      }
    );
  });
}

function dropLeaf(context) {
  const x = randInt(50, 250);
  const y = randInt(50, 250);
  context.moveTo(x, y);

  const radius = randInt(1, 2);
  const startAngle = Math.random() * 4;
  context.arc(x, y, radius, startAngle, Math.PI * 2);
  const fillColor = getRandTeaColor();
  context.fillStyle = fillColor;
  context.fill();
}

function getRandTeaColor() {
  return pluck(TEA_COLORS);
}

/** Inclusive */
function randInt(min = 0, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pluck(arr) {
  return arr[randInt(0, arr.length - 1)];
}

function saveImg(buffer) {
  const outputPath = path.resolve(__dirname, "..", "output");
  fs.mkdirSync(outputPath, { recursive: true });

  fs.writeFileSync(
    path.resolve(outputPath, `image-${getTimestamp()}.png`),
    buffer
  );
}

function getTimestamp() {
  return new Date().toISOString();
}
