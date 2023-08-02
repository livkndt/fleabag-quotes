import express, { Express, Request, Response } from 'express';
import { Quote, getQuotes, quotes } from './quotes';
import { generateQuoteImage } from './imageGenerator';

const app: Express = express();

const characterNotFound = (character: string, res: Response) => {
  res.status(404).json({ message: `No quotes found for "${character}".` });
};

app.get('/quotes/random', (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Quotes']
    #swagger.description = 'Get a random quote from the show.'
    #swagger.produces = ['application/json']
    #swagger.responses[200] = { schema: { "$ref": "#/definitions/Quote" } }
  */
  res.json(quotes[Math.floor(Math.random() * quotes.length)]);
});

app.get('/quotes/characters', (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Quotes']
    #swagger.description = 'Returns a list of all the characters who have quotes available.'
    #swagger.produces = ['application/json']
  */
  const characters: string[] = Array.from(
    new Set(quotes.map((quote: Quote) => quote.character)),
  );
  res.json(characters);
});

app.get('/quotes/random/inspirational', (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Quotes']
    #swagger.description = 'Returns a random quote from any character in the show as an inspirational 400x400 png image.'
    #swagger.produces = ['image/png']
  */
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  const img: Buffer = generateQuoteImage(quote);

  res.contentType('image/png');
  res.send(img);
});

app.get('/quotes/:id', (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Quotes']
    #swagger.description = 'Returns a quote from the show by numeric quote id.'
    #swagger.produces = ['application/json']
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Quote ID',
        required: true
    }
  */
  const { id } = req.params;
  const quote = quotes.find((quote: Quote) => quote.id === Number(id));
  if (!quote) {
    res.status(404).json({ message: `No quote found with id: ${id}.` });
    return;
  }
  /*
    #swagger.responses[200] = { schema: { "$ref": "#/definitions/Quote" } }
  */
  res.json(quote);
});

app.get('/quotes/:id/inspirational', (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Quotes']
    #swagger.description = 'Returns a quote from the show by numeric quote id as an inspirational 400x400 png image.'
    #swagger.produces = ['image/png']
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Quote ID',
        required: true
    }
  */
  const { id } = req.params;
  const quote = quotes.find((quote: Quote) => quote.id === Number(id));
  if (!quote) {
    res.status(404).json({ message: `No quote found with id: ${id}.` });
    return;
  }
  const img: Buffer = generateQuoteImage(quote);
  res.contentType('image/png');
  res.send(img);
});

app.get('/quotes/characters/:character', (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Quotes']
    #swagger.description = 'Returns all the quotes from a specific character.'
    #swagger.produces = ['application/json']
    #swagger.parameters['character'] = {
        in: 'path',
        description: 'Character name',
        required: true
    }
  */
  const { character } = req.params;
  const quotesByCharacter: string[] = getQuotes(character);

  if (quotesByCharacter.length === 0) {
    characterNotFound(character, res);
    return;
  }
  /*
    #swagger.responses[200] = { schema: { type: 'array', items: { "$ref": "#/definitions/Quote" } } }
  */
  res.json(quotesByCharacter);
});

app.get(
  '/quotes/characters/:character/random',
  (req: Request, res: Response) => {
    /*
      #swagger.tags = ['Quotes']
      #swagger.description = 'Returns a random quote from a specific character.'
      #swagger.produces = ['application/json']
      #swagger.parameters['character'] = {
          in: 'path',
          description: 'Character name',
          required: true
      }
    */
    const { character } = req.params;
    const quotesByCharacter: string[] = getQuotes(character);

    if (quotesByCharacter.length === 0) {
      characterNotFound(character, res);
      return;
    }
    /*
      #swagger.responses[200] = { schema: { "$ref": "#/definitions/Quote" } }
    */
    res.json(
      quotesByCharacter[Math.floor(Math.random() * quotesByCharacter.length)],
    );
  },
);

export default app;
