import { getQuotes, Quote } from './Quote';

describe('getQuotes', () => {
  it('should return quote by character', () => {
    const result: Quote[] = getQuotes('Anthony');
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
