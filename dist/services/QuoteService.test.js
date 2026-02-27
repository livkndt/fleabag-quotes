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
describe('searchQuotes', () => {
    it('should return quotes matching the query', () => {
        const result = (0, QuoteService_1.searchQuotes)('hair');
        expect(result.length).toBeGreaterThan(0);
        result.forEach((q) => expect(q.quote.toLowerCase()).toContain('hair'));
    });
    it('should search case-insensitively', () => {
        const lower = (0, QuoteService_1.searchQuotes)('hair');
        const upper = (0, QuoteService_1.searchQuotes)('HAIR');
        expect(upper).toEqual(lower);
    });
    it('should return empty array for no matches', () => {
        const result = (0, QuoteService_1.searchQuotes)('xyznotamatch12345');
        expect(result).toHaveLength(0);
    });
});
describe('getQuotesByCharacters', () => {
    it('should return quotes for all specified characters', () => {
        const result = (0, QuoteService_1.getQuotesByCharacters)(['Anthony', 'Boo']);
        expect(result.length).toBeGreaterThan(0);
        result.forEach((q) => expect(['Anthony', 'Boo']).toContain(q.character));
    });
    it('should filter case-insensitively', () => {
        const lower = (0, QuoteService_1.getQuotesByCharacters)(['fleabag']);
        const mixed = (0, QuoteService_1.getQuotesByCharacters)(['Fleabag']);
        expect(lower).toEqual(mixed);
    });
    it('should return empty array when no characters match', () => {
        const result = (0, QuoteService_1.getQuotesByCharacters)(['NotACharacter']);
        expect(result).toHaveLength(0);
    });
});
//# sourceMappingURL=QuoteService.test.js.map