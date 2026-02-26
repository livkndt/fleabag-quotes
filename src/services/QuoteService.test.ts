import Quote from '../models/Quote/Quote';
import { getQuotes, searchQuotes } from './QuoteService';

describe('getQuotes', () => {
  it('should return quote by character', () => {
    const result: Quote[] = getQuotes('Anthony');
    expect(result).toHaveLength(1);
    expect(result[0].quote).toBe(
      "If you want to change your life, change your life. It isn't going to happen in here.",
    );
  });
  it('should return quotes case-insensitively', () => {
    const result: Quote[] = getQuotes('anthony');
    expect(result).toHaveLength(1);
    expect(result[0].quote).toBe(
      "If you want to change your life, change your life. It isn't going to happen in here.",
    );
  });
  it('should return empty array for non-existent character', () => {
    const result: Quote[] = getQuotes('NotACharacter');
    expect(result).toHaveLength(0);
  });
});

describe('searchQuotes', () => {
  it('should return quotes matching the query', () => {
    const result: Quote[] = searchQuotes('hair');
    expect(result.length).toBeGreaterThan(0);
    result.forEach((q) => expect(q.quote.toLowerCase()).toContain('hair'));
  });
  it('should search case-insensitively', () => {
    const lower: Quote[] = searchQuotes('hair');
    const upper: Quote[] = searchQuotes('HAIR');
    expect(upper).toEqual(lower);
  });
  it('should return empty array for no matches', () => {
    const result: Quote[] = searchQuotes('xyznotamatch12345');
    expect(result).toHaveLength(0);
  });
});
