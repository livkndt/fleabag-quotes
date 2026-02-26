"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const QuoteService_1 = require("../services/QuoteService");
const quotesRouter = express_1.default.Router();
const quotes = (0, QuoteService_1.getQuotes)();
const characterNotFound = (character, res) => {
    res.status(404).json({ message: `No quotes found for "${character}".` });
};
const quoteNotFound = (id, res) => {
    res.status(404).json({ message: `No quote found with id: ${id}.` });
};
const quoteImage = (req, quote) => {
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
    return (0, QuoteService_1.getQuoteImage)(quote, Number(req.query.imageWidth) || 400, Number(req.query.imageHeight) || 400, Number(req.query.fontSize) || 24);
};
quotesRouter.get('/', (req, res) => {
    /*
      #swagger.tags = ['Quotes']
      #swagger.description = 'Returns all quotes, or filters by text search using the q query parameter.'
      #swagger.produces = ['application/json']
      #swagger.parameters['q'] = {
          in: 'query',
          description: 'Search term to filter quotes by text (case-insensitive)',
          required: false,
          type: 'string'
      }
      #swagger.responses[200] = { schema: { type: 'array', items: { "$ref": "#/definitions/Quote" } } }
    */
    const q = req.query.q;
    if (q) {
        res.json((0, QuoteService_1.searchQuotes)(q));
        return;
    }
    res.json(quotes);
});
quotesRouter.get('/random', (req, res) => {
    /*
      #swagger.tags = ['Quotes']
      #swagger.description = 'Get a random quote from the show.'
      #swagger.produces = ['application/json']
      #swagger.responses[200] = { schema: { "$ref": "#/definitions/Quote" } }
    */
    res.json(quotes[Math.floor(Math.random() * quotes.length)]);
});
quotesRouter.get('/characters', (req, res) => {
    /*
      #swagger.tags = ['Quotes']
      #swagger.description = 'Returns a list of all the characters who have quote available.'
      #swagger.produces = ['application/json']
    */
    const characters = Array.from(new Set(quotes.map((quote) => quote.character)));
    res.json(characters);
});
quotesRouter.get('/random/inspirational', (req, res) => {
    /*
      #swagger.tags = ['Images']
      #swagger.description = 'Returns a random quote from any character in the show as an inspirational 400x400 png image.'
      #swagger.produces = ['image/png']
    */
    const img = quoteImage(req, quotes[Math.floor(Math.random() * quotes.length)]);
    res.contentType('image/png');
    res.send(img);
});
quotesRouter.get('/:id', (req, res) => {
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
    const quote = (0, QuoteService_1.getQuote)(Number(req.params.id));
    if (!quote) {
        quoteNotFound(req.params.id, res);
        return;
    }
    /*
      #swagger.responses[200] = { schema: { "$ref": "#/definitions/Quote" } }
    */
    res.json(quote);
});
quotesRouter.get('/:id/inspirational', (req, res) => {
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
    const quote = (0, QuoteService_1.getQuote)(Number(req.params.id));
    if (!quote) {
        quoteNotFound(req.params.id, res);
        return;
    }
    const img = quoteImage(req, quote);
    res.contentType('image/png');
    res.send(img);
});
quotesRouter.get('/characters/:character', (req, res) => {
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
    const quotesByCharacter = (0, QuoteService_1.getQuotes)(req.params.character);
    if (quotesByCharacter.length === 0) {
        characterNotFound(req.params.character, res);
        return;
    }
    /*
      #swagger.responses[200] = { schema: { type: 'array', items: { "$ref": "#/definitions/Quote" } } }
    */
    res.json(quotesByCharacter);
});
quotesRouter.get('/characters/:character/random', (req, res) => {
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
    const quotesByCharacter = (0, QuoteService_1.getQuotes)(req.params.character);
    if (quotesByCharacter.length === 0) {
        characterNotFound(req.params.character, res);
        return;
    }
    /*
        #swagger.responses[200] = { schema: { "$ref": "#/definitions/Quote" } }
      */
    res.json(quotesByCharacter[Math.floor(Math.random() * quotesByCharacter.length)]);
});
exports.default = quotesRouter;
//# sourceMappingURL=quotes.js.map