"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const QuoteService_1 = require("../services/QuoteService");
const quotes = (0, QuoteService_1.getQuotes)();
describe('GET /quote/:id', () => {
    it('should respond with a quote given a quote id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/quotes/6');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 6,
            character: 'Boo',
            quote: "As long as I can wear it or eat it, I'm happy.",
        });
    }));
    it('should respond with a 404 NotFound if quote is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/quotes/1000');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('No quote found with id: 1000.');
    }));
});
describe('GET /quote/characters', () => {
    it('should respond with a list of characters', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/quotes/characters');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            'Anthony',
            'Belinda',
            'Boo',
            'Claire',
            'Dad',
            'Fleabag',
            'Harry',
            'Klare',
            'Martin',
            'The Counsellor',
            'The Priest',
        ]);
    }));
});
describe('GET /quote/random', () => {
    it('should respond with a random quote', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/quotes/random');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('quote');
        expect(response.body).toHaveProperty('character');
        expect(quotes.some((quote) => quote.quote === response.body.quote && quote.character === response.body.character)).toBe(true);
    }));
});
describe('GET /quote/characters/:character', () => {
    it('should respond with quote for a specific character', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/quotes/characters/Fleabag');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(21);
        expect(response.body.map((quote) => quote.quote)).toContain('Hair is everything.');
    }));
    it('should respond with a 404 NotFound if character is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/quotes/characters/NotACharacter');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('No quotes found for "NotACharacter".');
    }));
});
describe('GET /quote/characters/:character/random', () => {
    it('should respond with a random quote from a specific character', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/quotes/characters/Fleabag/random');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('quote');
        expect(quotes.some((quote) => quote.quote === response.body.quote)).toBe(true);
    }));
    it('should respond with a 404 NotFound if character is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/quotes/characters/NotACharacter/random');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('No quotes found for "NotACharacter".');
    }));
});
describe('GET /quote/random/inspirational', () => {
    it('should respond with a random quote image', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/quotes/random/inspirational');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('image/png');
    }));
});
//# sourceMappingURL=quotes.test.js.map