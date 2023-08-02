import {
  Canvas,
  CanvasRenderingContext2D,
  createCanvas,
  registerFont,
} from 'canvas';
import { Quote } from './quotes';

registerFont('./src/assets/LibreBaskerville-Regular.ttf', {
  family: 'LibreBaskervilleRegular',
});
registerFont('./src/assets/LibreBaskerville-Italic.ttf', {
  family: 'LibreBaskervilleItalic',
});

const getRandomHexCode = () => {
  const hexChars: string = '0123456789ABCDEF';
  let color: string = '#';

  for (let i: number = 0; i < 6; i++) {
    const randomIndex: number = Math.floor(Math.random() * hexChars.length);
    color += hexChars[randomIndex];
  }
  return color;
};

const drawCenteredQuote = (
  context: CanvasRenderingContext2D,
  fontColor: string,
  quote: Quote,
  maxWidth: number,
  fontSize: number = 24,
) => {
  // Set styling
  context.textBaseline = 'middle';
  context.fillStyle = fontColor;

  const quoteText: string = `"${quote.quote}"`;
  const authorText: string =
    quote.character == 'Fleabag' ? 'Fleabag' : `${quote.character} - Fleabag`;
  const centerX: number = context.canvas.width / 2;
  const centerY: number = context.canvas.height / 2;

  let lineFontSize: number = fontSize;
  let lineHeight: number = fontSize * 1.5;
  let lines: string[] = [];

  // Chunk text into lines that fit the canvas width & return height of all lines
  const splitIntoLines = (text: string): number => {
    context.font = `${lineFontSize}px "LibreBaskervilleRegular", serif`;
    const words: string[] = text.split(' ');
    let line: string = '';
    lines = [];

    for (let i: number = 0; i < words.length; i++) {
      const testLine: string = line + words[i] + ' ';
      const testWidth: number = context.measureText(testLine).width;
      if (testWidth > maxWidth && i > 0) {
        lines.push(line);
        line = words[i] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    lines.push('________');
    lines.push(authorText);

    return lineHeight * lines.length;
  };

  while (splitIntoLines(quoteText) >= context.canvas.height - fontSize * 3) {
    // Reduce font size & line height if text is larger than canvas height (+ padding)
    lineFontSize -= 2;
    lineHeight -= 2;
  }

  const drawLine = (line: string) => {
    const metrics: TextMetrics = context.measureText(line);
    const drawX: number = centerX - metrics.width / 2;
    context.fillText(line, drawX, drawY);
  };

  // Center the text & draw each line
  let drawY: number = centerY - ((lines.length - 1) * lineHeight) / 2;
  for (let i: number = 0; i < lines.length - 2; i++) {
    drawLine(lines[i]);
    drawY += lineHeight;
  }

  // Draw the last line (character) in italics
  context.font = `${lineFontSize}px Tahoma, serif`;
  drawLine(lines[lines.length - 2]);
  drawY += lineHeight * 1.5;
  context.font = `${lineFontSize}px "LibreBaskervilleItalic", serif`;
  drawLine(lines[lines.length - 1]);
};

const drawRandomBackground = (
  context: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
) => {
  // Create linear or radial gradient with randomised colours
  const today: Date = new Date();
  const seconds: number = today.getSeconds();
  let gradient: CanvasGradient;
  if (seconds % 2 === 0) {
    gradient = context.createLinearGradient(0, 1000, 1000, 0);
    gradient.addColorStop(0.5, getRandomHexCode());
  } else {
    gradient = context.createRadialGradient(
      canvasWidth / 2,
      canvasWidth / 2,
      0,
      canvasWidth / 2,
      canvasWidth / 2,
      canvasWidth / 2,
    );
  }
  gradient.addColorStop(0, getRandomHexCode());
  gradient.addColorStop(1, getRandomHexCode());

  // Assign gradient to fill style & draw
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvasWidth, canvasHeight);
};

export const generateQuoteImage = (
  quote: Quote,
  imageWidth: number = 400,
  imageHeight: number = 400,
  fontSize: number = 24,
): Buffer => {
  const quoteMaxWidth: number = imageWidth - imageWidth * 0.2; // 10% padding on each side
  const fontColor: string = '#000';

  const canvas: Canvas = createCanvas(imageWidth, imageHeight);
  const context: CanvasRenderingContext2D = canvas.getContext('2d');

  context.globalAlpha = 0.6;
  drawRandomBackground(context, imageWidth, imageHeight);

  context.globalAlpha = 1;
  drawCenteredQuote(context, fontColor, quote, quoteMaxWidth, fontSize);

  return canvas.toBuffer();
};
