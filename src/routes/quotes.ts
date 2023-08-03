import express, { Request, Response } from 'express';
import { getQuotes, Quote, quotes } from '../models/Quote/Quote';
import { QuoteImage } from '../models/QuoteImage/QuoteImage';

const quotesRouter = express.Router();

const characterNotFound = (character: string, res: Response) => {
  res.status(404).json({ message: `No quotes found for "${character}".` });
};

const getQuoteImage = (req: Request, quote: Quote): Buffer => {
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
  const imageWidth: number = req.query.imageWidth
    ? Math.min(Number(req.query.imageWidth), 2400)
    : 400;
  const imageHeight: number = req.query.imageHeight
    ? Math.min(Number(req.query.imageHeight), 3000)
    : 400;
  const fontSize: number = req.query.fontSize
    ? Math.min(Number(req.query.fontSize), 96)
    : 24;

  const quoteImage = new QuoteImage(quote, imageWidth, imageHeight, fontSize);
  return quoteImage.buffer;
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
  const characters: string[] = Array.from(
    new Set(quotes.map((quote: Quote) => quote.character)),
  );
  res.json(characters);
});

quotesRouter.get('/random/inspirational', (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Images']
    #swagger.description = 'Returns a random quote from any character in the show as an inspirational 400x400 png image.'
    #swagger.produces = ['image/png']
  */
  const quote: Quote = quotes[Math.floor(Math.random() * quotes.length)];
  const img: Buffer = getQuoteImage(req, quote);

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
  const { id } = req.params;
  const quote = quotes.find((quote: Quote) => quote.id === Number(id));
  if (!quote) {
    res.status(404).json({ message: `No quote found with id: ${id}.` });
    return;
  }

  const img: Buffer = getQuoteImage(req, quote);
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
  const { character } = req.params;
  const quotesByCharacter: Quote[] = getQuotes(character);

  if (quotesByCharacter.length === 0) {
    characterNotFound(character, res);
    return;
  }
  /*
    #swagger.responses[200] = { schema: { type: 'array', items: { "$ref": "#/definitions/Quote" } } }
  */
  res.json(quotesByCharacter);
});

quotesRouter.get(
  '/characters/:character/random',
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
    const quotesByCharacter: Quote[] = getQuotes(character);

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

export default quotesRouter;
