import express, { Request, Response, Router } from 'express';
import Quote from '../models/Quote/Quote';
import { getQuote, getQuotes, getQuoteImage } from '../services/QuoteService';

const quotesRouter: Router = express.Router();

const quotes: Quote[] = getQuotes();

const characterNotFound = (character: string, res: Response) => {
  res.status(404).json({ message: `No quotes found for "${character}".` });
};

const quoteNotFound = (id: string, res: Response) => {
  res.status(404).json({ message: `No quote found with id: ${id}.` });
};

const quoteImage = (req: Request, quote: Quote): Buffer => {
  /*
    #swagger.parameters['imageWidth'] = {
        in: 'query',
        description: 'Width of image in pixels (max 2400)',
        required: false,
        type: 'integer'
    }
    #swagger.parameters['imageHeight'] = {
        in: 'query',
        description: 'Height of image in pixels (max 3000)',
        required: false,
        type: 'integer'
    }
    #swagger.parameters['fontSize'] = {
        in: 'query',
        description: 'Font size of the quote text (max 96)',
        required: false,
        type: 'integer'
    }
  */
  return getQuoteImage(
    quote,
    Number(req.query.imageWidth) || 400,
    Number(req.query.imageHeight) || 400,
    Number(req.query.fontSize) || 24,
  );
};

quotesRouter.get('/random', (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Quotes']
    #swagger.description = 'Get a random quote from the show.'
    #swagger.produces = ['application/json']
    #swagger.responses[200] = { schema: { "$ref": "#/definitions/Quote" } }
  */
  res.json(quotes[Math.floor(Math.random() * quotes.length)]);
});

quotesRouter.get('/characters', (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Quotes']
    #swagger.description = 'Returns a list of all the characters who have quote available.'
    #swagger.produces = ['application/json']
  */
  const characters: string[] = Array.from(new Set(quotes.map((quote: Quote) => quote.character)));
  res.json(characters);
});

quotesRouter.get('/random/inspirational', (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Images']
    #swagger.description = 'Returns a random quote from any character in the show as an inspirational 400x400 png image.'
    #swagger.produces = ['image/png']
  */
  const img: Buffer = quoteImage(req, quotes[Math.floor(Math.random() * quotes.length)]);

  res.contentType('image/png');
  res.send(img);
});

quotesRouter.get('/:id', (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Quotes']
    #swagger.description = 'Returns a quote from the show by numeric quote id.'
    #swagger.produces = ['application/json']
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Quote ID',
        required: true,
        type: 'integer'
    }
  */
  const quote: Quote | undefined = getQuote(Number(req.params.id));
  if (!quote) {
    quoteNotFound(req.params.id, res);
    return;
  }
  /*
    #swagger.responses[200] = { schema: { "$ref": "#/definitions/Quote" } }
  */
  res.json(quote);
});

quotesRouter.get('/:id/inspirational', (req: Request, res: Response) => {
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
  const quote: Quote | undefined = getQuote(Number(req.params.id));
  if (!quote) {
    quoteNotFound(req.params.id, res);
    return;
  }

  const img: Buffer = quoteImage(req, quote);
  res.contentType('image/png');
  res.send(img);
});

quotesRouter.get('/characters/:character', (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Quotes']
    #swagger.description = 'Returns all the quote from a specific character.'
    #swagger.produces = ['application/json']
    #swagger.parameters['character'] = {
        in: 'path',
        description: 'Character name',
        required: true
    }
  */
  const quotesByCharacter: Quote[] = getQuotes(req.params.character);
  if (quotesByCharacter.length === 0) {
    characterNotFound(req.params.character, res);
    return;
  }
  /*
    #swagger.responses[200] = { schema: { type: 'array', items: { "$ref": "#/definitions/Quote" } } }
  */
  res.json(quotesByCharacter);
});

quotesRouter.get('/characters/:character/random', (req: Request, res: Response) => {
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
  const quotesByCharacter: Quote[] = getQuotes(req.params.character);
  if (quotesByCharacter.length === 0) {
    characterNotFound(req.params.character, res);
    return;
  }
  /*
      #swagger.responses[200] = { schema: { "$ref": "#/definitions/Quote" } }
    */
  res.json(quotesByCharacter[Math.floor(Math.random() * quotesByCharacter.length)]);
});

export default quotesRouter;
