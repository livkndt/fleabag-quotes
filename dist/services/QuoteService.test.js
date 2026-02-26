"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuoteService_1 = require("./QuoteService");
describe('getQuotes', () => {
    it('should return quote by character', () => {
        const result = (0, QuoteService_1.getQuotes)('Anthony');
        expect(result).toHaveLength(1);
        expect(result[0].quote).toBe("If you want to change your life, change your life. It isn't going to happen in here.");
    });
    it('should return quotes case-insensitively', () => {
        const result = (0, QuoteService_1.getQuotes)('anthony');
        expect(result).toHaveLength(1);
        expect(result[0].quote).toBe("If you want to change your life, change your life. It isn't going to happen in here.");
    });
    it('should return empty array for non-existent character', () => {
        const result = (0, QuoteService_1.getQuotes)('NotACharacter');
        expect(result).toHaveLength(0);
    });
});
//# sourceMappingURL=QuoteService.test.js.map