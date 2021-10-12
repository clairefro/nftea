const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

const width = 300;
const height = 300;

const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

loadImage(`${__dirname}/assets/cup.png`).then((image) => {
  context.drawImage(image, 0, 0);
  const buffer = canvas.toBuffer("image/png");

  fs.writeFileSync("./image.png", buffer);
});
