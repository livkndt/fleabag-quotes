import express, { Express, Request, Response } from 'express';
import { Quote, getQuotes, quotes } from './quotes';

const app: Express = express();

const characterNotFound = (character: string, res: Response) => {
  res.status(404).json({ message: `No quotes found for "${character}".` });
};

app.get('/quotes/characters', (req: Request, res: Response) => {
  const characters: string[] = Array.from(
    new Set(quotes.map((quote: Quote) => quote.character)),
  );
  res.json(characters);
});

app.get('/quotes/random', (req: Request, res: Response) => {
  res.json(quotes[Math.floor(Math.random() * quotes.length)]);
});

app.get('/quotes/:character', (req: Request, res: Response) => {
  const { character } = req.params;
  const quotesByCharacter: string[] = getQuotes(character);

  if (quotesByCharacter.length === 0) {
    characterNotFound(character, res);
    return;
  }
  res.json(quotesByCharacter);
});

app.get('/quotes/:character/random', (req: Request, res: Response) => {
  const { character } = req.params;
  const quotesByCharacter: string[] = getQuotes(character);

  if (quotesByCharacter.length === 0) {
    characterNotFound(character, res);
    return;
  }
  res.json(
    quotesByCharacter[Math.floor(Math.random() * quotesByCharacter.length)],
  );
});

export default app;
