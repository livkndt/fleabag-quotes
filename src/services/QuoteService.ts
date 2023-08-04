import Quote from '../models/Quote/Quote';
import QuoteImage from '../models/QuoteImage/QuoteImage';
import quotes from '../data/QuoteRepository';

export const getQuotes = (character: string | undefined = undefined): Quote[] => {
  if (character) {
    return quotes.filter((quote: Quote) => quote.character === character);
  }
  return quotes;
};

export const getQuote = (id: number): Quote | undefined => quotes.find((quote: Quote) => quote.id === id);

export const getQuoteImage = (
  quote: Quote,
  requestWidth: number,
  requestHeight: number,
  requestFontSize: number,
): Buffer => {
  const imageWidth = Math.min(requestWidth, 2400);
  const imageHeight = Math.min(requestHeight, 3000);
  const fontSize = Math.min(requestFontSize, 96);

  const quoteImage = new QuoteImage(quote, imageWidth, imageHeight, fontSize);
  return quoteImage.buffer;
};
