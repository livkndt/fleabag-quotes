"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const canvas_1 = require("canvas");
const utils_1 = require("../../utils/utils");
(0, canvas_1.registerFont)(path_1.default.join(__dirname, '../../assets/LibreBaskerville-Regular.ttf'), {
    family: 'LibreBaskervilleRegular',
});
(0, canvas_1.registerFont)(path_1.default.join(__dirname, '../../assets/LibreBaskerville-Italic.ttf'), {
    family: 'LibreBaskervilleItalic',
});
class QuoteImage {
    constructor(quote, imageWidth, imageHeight, fontSize) {
        this._fontSize = 24;
        this._quote = quote;
        this._imageWidth = imageWidth;
        this._imageHeight = imageHeight;
        this._fontSize = fontSize;
        this._buffer = this.generate();
    }
    get buffer() {
        return this._buffer;
    }
    generate() {
        const quoteMaxWidth = this._imageWidth - this._imageWidth * 0.2; // 10% padding on each side
        const fontColor = '#000';
        const canvas = (0, canvas_1.createCanvas)(this._imageWidth, this._imageHeight);
        const context = canvas.getContext('2d');
        context.globalAlpha = 0.6;
        this.drawRandomBackground(context, this._imageWidth, this._imageHeight);
        context.globalAlpha = 1;
        this.drawCenteredQuote(context, fontColor, this._quote, quoteMaxWidth, this._fontSize);
        return canvas.toBuffer();
    }
    drawRandomBackground(context, canvasWidth, canvasHeight) {
        // Create linear or radial gradient with randomised colours
        const today = new Date();
        const seconds = today.getSeconds();
        let gradient;
        if (seconds % 2 === 0) {
            gradient = context.createLinearGradient(0, 1000, 1000, 0);
            gradient.addColorStop(0.5, (0, utils_1.getRandomHexCode)());
        }
        else {
            gradient = context.createRadialGradient(canvasWidth / 2, canvasWidth / 2, 0, canvasWidth / 2, canvasWidth / 2, canvasWidth / 2);
        }
        gradient.addColorStop(0, (0, utils_1.getRandomHexCode)());
        gradient.addColorStop(1, (0, utils_1.getRandomHexCode)());
        // Assign gradient to fill style & draw
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvasWidth, canvasHeight);
    }
    drawCenteredQuote(context, fontColor, quote, maxWidth, fontSize = 24) {
        // Set styling
        context.textBaseline = 'middle';
        context.fillStyle = fontColor;
        const quoteText = `"${quote.quote}"`;
        const authorText = quote.character == 'Fleabag' ? 'Fleabag' : `${quote.character} - Fleabag`;
        const centerX = context.canvas.width / 2;
        const centerY = context.canvas.height / 2;
        let lineFontSize = fontSize;
        let lineHeight = fontSize * 1.5;
        let lines = [];
        // Chunk text into lines that fit the canvas width & return height of all lines
        const splitIntoLines = (text) => {
            context.font = `${lineFontSize}px "LibreBaskervilleRegular", serif`;
            const words = text.split(' ');
            let line = '';
            lines = [];
            for (let i = 0; i < words.length; i++) {
                const testLine = line + words[i] + ' ';
                const testWidth = context.measureText(testLine).width;
                if (testWidth > maxWidth && i > 0) {
                    lines.push(line);
                    line = words[i] + ' ';
                }
                else {
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
        const drawLine = (line) => {
            const metrics = context.measureText(line);
            const drawX = centerX - metrics.width / 2;
            context.fillText(line, drawX, drawY);
        };
        // Center the text & draw each line
        let drawY = centerY - ((lines.length - 1) * lineHeight) / 2;
        for (let i = 0; i < lines.length - 2; i++) {
            drawLine(lines[i]);
            drawY += lineHeight;
        }
        // Draw the last line (character) in italics
        context.font = `${lineFontSize}px Tahoma, serif`;
        drawLine(lines[lines.length - 2]);
        drawY += lineHeight * 1.5;
        context.font = `${lineFontSize}px "LibreBaskervilleItalic", serif`;
        drawLine(lines[lines.length - 1]);
    }
}
exports.default = QuoteImage;
//# sourceMappingURL=QuoteImage.js.map