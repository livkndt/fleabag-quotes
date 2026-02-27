import request from 'supertest';
import app from '../app';
import Quote from '../models/Quote/Quote';
import { getQuotes } from '../services/QuoteService';

const quotes: Quote[] = getQuotes();

describe('GET /quotes', () => {
  it('should respond with all quotes', async () => {
    const response = await request(app).get('/quotes');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(quotes.length);
  });
  it('should respond with matching quotes for a search query', async () => {
    const response = await request(app).get('/quotes?q=hair');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    response.body.forEach((q: Quote) => expect(q.quote.toLowerCase()).toContain('hair'));
  });
  it('should respond with empty array for a search query with no matches', async () => {
    const response = await request(app).get('/quotes?q=xyznotamatch12345');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
  it('should respond with a paginated envelope when limit is provided', async () => {
    const response = await request(app).get('/quotes?limit=5');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(5);
    expect(response.body.total).toBe(quotes.length);
    expect(response.body.page).toBe(1);
    expect(response.body.limit).toBe(5);
    expect(response.body.totalPages).toBe(Math.ceil(quotes.length / 5));
  });
  it('should respond with the correct page of results', async () => {
    const response = await request(app).get('/quotes?page=2&limit=5');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(5);
    expect(response.body.page).toBe(2);
    expect(response.body.data[0]).toEqual(quotes[5]);
  });
  it('should combine search and pagination', async () => {
    const response = await request(app).get('/quotes?q=hair&limit=1');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].quote.toLowerCase()).toContain('hair');
  });
  it('should return empty data for an out-of-range page', async () => {
    const response = await request(app).get('/quotes?page=1000&limit=10');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(0);
    expect(response.body.total).toBe(quotes.length);
  });
});

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
      'Godmother',
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
    expect(response.body).toHaveLength(35);
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
