"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QuoteImage_1 = __importDefault(require("./QuoteImage"));
describe('QuoteImage', () => {
    it('should create an instance of QuoteImage and have a buffer property', () => {
        const quote = {
            id: 1,
            character: 'Fleabag',
            quote: 'Love is awful.',
        };
        const quoteImage = new QuoteImage_1.default(quote, 400, 400, 24);
        expect(quoteImage).toBeInstanceOf(QuoteImage_1.default);
        expect(quoteImage.buffer).toBeInstanceOf(Buffer);
    });
});
//# sourceMappingURL=QuoteImage.test.js.map