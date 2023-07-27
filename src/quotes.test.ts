import { getQuotes } from './quotes';

describe('getQuotes', () => {
  it('should return quotes by character', () => {
    const result = getQuotes('Anthony');
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(
      "If you want to change your life, change your life. It isn't going to happen in here.",
    );
  });
  it('should return empty array for non-existent character', () => {
    const result = getQuotes('NotACharacter');
    expect(result).toHaveLength(0);
  });
});
