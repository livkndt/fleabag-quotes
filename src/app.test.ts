import request from 'supertest';
import app from './app';

describe('GET /quotes/random', () => {
  it('should respond with a random quote', async () => {
    const response = await request(app).get('/quotes/random');
    expect(response.status).toBe(200);
    expect(response.body).toBe(
      "I'm not a bad guy. I just have a bad personality.",
    );
  });
});
