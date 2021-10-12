const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

const width = 300;
const height = 300;

const TEA_COLORS = [
  "rgb(36, 66, 51)",
  "rgb(49, 82, 65)",
  "rgb(20, 20, 20)",
  "rgb(25, 33, 27)",
];

brewTea();

function brewTea() {
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  loadImage(path.resolve(__dirname, "assets", "cup.png")).then((image) => {
    context.drawImage(image, 0, 0);

    const numLeaves = randInt(100, 850);
    for (let i = 0; i < numLeaves; i++) {
      const x = randInt(50, 250);
      const y = randInt(50, 250);
      context.moveTo(x, y);
      // const radius = randInt(1, 2);
      const radius = 1;
      context.arc(x, y, radius, 0, Math.PI * 2);
      const fillColor = pluck(TEA_COLORS);
      context.fillStyle = fillColor;
      context.fill();
    }

    const buffer = canvas.toBuffer("image/png");
    saveImg(buffer);
  });
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
