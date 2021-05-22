#!/usr/bin/env node

const sharp = require('sharp');
const path = require('path');

const { program } = require('commander');

program.version('1.1.0');

program
  .option('-i, --image <path>', 'Image for optimizing')
  .option('-w, --width <width>', 'Target width of the image')
  .option('-h, --height <height>', 'Target height of the image')
  .option('-o, --outputFolder <outputFolder>', 'The folder to output images to')

program.parse(process.argv);

const options = program.opts();

if (!options.image) {
  console.error("error: --image option is required");
  process.exit(1);
}

if (!options.outputFolder) {
  console.error("error: --outputFolder option is required");
  process.exit(1);
}

if (!options.width && !options.height) {
  console.error("error: Either --width or --height is required");
  process.exit(1);
}

async function createWebps() {
  const fileNameWithoutExtension = path.basename(options.image, path.extname(options.image));

  await sharp(options.image)
    .resize(options.width ? Number(options.width) : undefined, options.height ? Number(options.height) : undefined)
    .webp({ quality: 75 })
    .toFile(path.join(options.outputFolder, `${fileNameWithoutExtension}.webp`));

  await sharp(options.image)
    .resize(options.width ? Number(options.width * 2) : undefined, options.height ? Number(options.height * 2) : undefined)
    .webp({ quality: 75 })
    .toFile(path.join(options.outputFolder, `${fileNameWithoutExtension}@x2.webp`));
}

async function createPngs() {
  const fileNameWithoutExtension = path.basename(options.image, path.extname(options.image));

  await sharp(options.image)
    .resize(options.width ? Number(options.width) : undefined, options.height ? Number(options.height) : undefined)
    .png({ quality: 80 })
    .toFile(path.join(options.outputFolder, `${fileNameWithoutExtension}.png`));

  await sharp(options.image)
    .resize(options.width ? Number(options.width * 2) : undefined, options.height ? Number(options.height * 2) : undefined)
    .png({ quality: 80 })
    .toFile(path.join(options.outputFolder, `${fileNameWithoutExtension}@x2.png`));
}

async function createJpegs() {
  const fileNameWithoutExtension = path.basename(options.image, path.extname(options.image));

  await sharp(options.image)
    .resize(options.width ? Number(options.width) : undefined, options.height ? Number(options.height) : undefined)
    .jpeg({ quality: 80 })
    .toFile(path.join(options.outputFolder, `${fileNameWithoutExtension}.jpg`));

  await sharp(options.image)
    .resize(options.width ? Number(options.width * 2) : undefined, options.height ? Number(options.height * 2) : undefined)
    .jpeg({ quality: 80 })
    .toFile(path.join(options.outputFolder, `${fileNameWithoutExtension}@x2.jpg`));
}

async function main() {
  if (options.image.endsWith(".png")) {
    await createPngs();
  } else {
    await createJpegs();
  }
  await createWebps();
}

main();
