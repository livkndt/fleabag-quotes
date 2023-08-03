import { QuoteImage } from './QuoteImage';
import { Quote } from '../quotes';

describe('QuoteImage', () => {
  it('should create an instance of QuoteImage and have a buffer property', () => {
    const quote: Quote = {
      id: 1,
      character: 'Fleabag',
      quote: 'Love is awful.',
    };
    const quoteImage = new QuoteImage(quote, 400, 400, 24);
    expect(quoteImage).toBeInstanceOf(QuoteImage);
    expect(quoteImage.buffer).toBeInstanceOf(Buffer);
  });
});
