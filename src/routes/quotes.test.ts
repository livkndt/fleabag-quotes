import request from 'supertest';
import app from '../index';
import Quote from '../models/Quote/Quote';
import { getQuotes } from '../services/QuoteService';

const quotes: Quote[] = getQuotes();

describe('GET /quote/:id', () => {
  it('should respond with a quote given a quote id', async () => {
    const response = await request(app).get('/quotes/6');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 6,
      character: 'Boo',
      quote: "As long as I can wear it or eat it, I'm happy.",
    });
  });
  it('should respond with a 404 NotFound if quote is not found', async () => {
    const response = await request(app).get('/quotes/1000');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No quote found with id: 1000.');
  });
});

describe('GET /quote/characters', () => {
  it('should respond with a list of characters', async () => {
    const response = await request(app).get('/quotes/characters');
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
  });
});

describe('GET /quote/random', () => {
  it('should respond with a random quote', async () => {
    const response = await request(app).get('/quotes/random');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('quote');
    expect(response.body).toHaveProperty('character');

    expect(
      quotes.some((quote) => quote.quote === response.body.quote && quote.character === response.body.character),
    ).toBe(true);
  });
});

describe('GET /quote/characters/:character', () => {
  it('should respond with quote for a specific character', async () => {
    const response = await request(app).get('/quotes/characters/Fleabag');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(21);
    expect(response.body.map((quote: Quote) => quote.quote)).toContain('Hair is everything.');
  });
  it('should respond with a 404 NotFound if character is not found', async () => {
    const response = await request(app).get('/quotes/characters/NotACharacter');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No quotes found for "NotACharacter".');
  });
});

describe('GET /quote/characters/:character/random', () => {
  it('should respond with a random quote from a specific character', async () => {
    const response = await request(app).get('/quotes/characters/Fleabag/random');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('quote');
    expect(quotes.some((quote: Quote) => quote.quote === response.body.quote)).toBe(true);
  });
  it('should respond with a 404 NotFound if character is not found', async () => {
    const response = await request(app).get('/quotes/characters/NotACharacter/random');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No quotes found for "NotACharacter".');
  });
});

describe('GET /quote/random/inspirational', () => {
  it('should respond with a random quote image', async () => {
    const response = await request(app).get('/quotes/random/inspirational');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('image/png');
  });
});
