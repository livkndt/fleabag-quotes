"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuoteImage = exports.getQuotesByCharacters = exports.searchQuotes = exports.getQuote = exports.getQuotes = void 0;
const QuoteImage_1 = __importDefault(require("../models/QuoteImage/QuoteImage"));
const QuoteRepository_1 = __importDefault(require("../data/QuoteRepository"));
const getQuotes = (character = undefined) => {
    if (character) {
        return QuoteRepository_1.default.filter((quote) => quote.character.toLowerCase() === character.toLowerCase());
    }
    return QuoteRepository_1.default;
};
exports.getQuotes = getQuotes;
const getQuote = (id) => QuoteRepository_1.default.find((quote) => quote.id === id);
exports.getQuote = getQuote;
const searchQuotes = (query) => QuoteRepository_1.default.filter((quote) => quote.quote.toLowerCase().includes(query.toLowerCase()));
exports.searchQuotes = searchQuotes;
const getQuotesByCharacters = (characters) => QuoteRepository_1.default.filter((quote) => characters.some((c) => quote.character.toLowerCase() === c.toLowerCase()));
exports.getQuotesByCharacters = getQuotesByCharacters;
const getQuoteImage = (quote, requestWidth, requestHeight, requestFontSize) => {
    const imageWidth = Math.min(requestWidth, 2400);
    const imageHeight = Math.min(requestHeight, 3000);
    const fontSize = Math.min(requestFontSize, 96);
    const quoteImage = new QuoteImage_1.default(quote, imageWidth, imageHeight, fontSize);
    return quoteImage.buffer;
};
exports.getQuoteImage = getQuoteImage;
//# sourceMappingURL=QuoteService.js.map