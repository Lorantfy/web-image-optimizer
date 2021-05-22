const sharp = require('sharp');
const path = require('path');

const { program } = require('commander');

program.version('1.0.0');

program
  .option('-i, --image <path>', 'Image for optimizing')
  .option('-w, --width <width>', 'Target width of the image')
  .option('-o, --outputFolder <outputFolder>', 'The folder to output images to')

program.parse(process.argv);

const options = program.opts();

async function createWebps() {
  const fileNameWithoutExtension = path.basename(options.image, path.extname(options.image));

  await sharp(options.image)
    .resize(Number(options.width))
    .webp({ quality: 75 })
    .toFile(path.join(options.outputFolder, `${fileNameWithoutExtension}.webp`));

  await sharp(options.image)
    .resize(Number(options.width) * 2)
    .webp({ quality: 75 })
    .toFile(path.join(options.outputFolder, `${fileNameWithoutExtension}@x2.webp`));
}

async function createPngs() {
  const fileNameWithoutExtension = path.basename(options.image, path.extname(options.image));

  await sharp(options.image)
    .resize(Number(options.width))
    .png({ quality: 80 })
    .toFile(path.join(options.outputFolder, `${fileNameWithoutExtension}.png`));

  await sharp(options.image)
    .resize(Number(options.width) * 2)
    .png({ quality: 80 })
    .toFile(path.join(options.outputFolder, `${fileNameWithoutExtension}@x2.png`));
}

async function createJpegs() {
  const fileNameWithoutExtension = path.basename(options.image, path.extname(options.image));

  await sharp(options.image)
    .resize(Number(options.width))
    .jpeg({ quality: 80 })
    .toFile(path.join(options.outputFolder, `${fileNameWithoutExtension}.jpg`));

  await sharp(options.image)
    .resize(Number(options.width) * 2)
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
