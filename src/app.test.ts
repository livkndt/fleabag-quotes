import request from 'supertest';
import app from './app';
import { quotes } from './quotes';

describe('GET /quotes/characters', () => {
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

describe('GET /quotes/random', () => {
  it('should respond with a random quote', async () => {
    const response = await request(app).get('/quotes/random');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('quote');
    expect(response.body).toHaveProperty('character');

    expect(
      quotes.some(
        (quote) =>
          quote.quote === response.body.quote &&
          quote.character === response.body.character,
      ),
    ).toBe(true);
  });
});

describe('GET /quotes/:character', () => {
  it('should respond with quotes for a specific character', async () => {
    const response = await request(app).get('/quotes/Fleabag');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(21);
    expect(response.body).toContain('Hair is everything.');
  });
  it('should respond with a 404 NotFound if character is not found', async () => {
    const response = await request(app).get('/quotes/NotACharacter');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No quotes found for "NotACharacter".');
  });
});

describe('GET /quotes/:character/random', () => {
  it('should respond with a random quote from a specific character', async () => {
    const response = await request(app).get('/quotes/Fleabag/random');
    expect(quotes.some((quote) => quote.quote === response.body)).toBe(true);
  });
  it('should respond with a 404 NotFound if character is not found', async () => {
    const response = await request(app).get('/quotes/NotACharacter/random');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No quotes found for "NotACharacter".');
  });
});
