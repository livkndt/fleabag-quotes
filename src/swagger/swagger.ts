import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Fleabag API',
    description:
      "Fleabag quote API. Get random quote from Phoebe Waller-Bridge's Fleabag.",
  },
  host: 'localhost:3000',
  schemes: ['https', 'http'],
  produces: ['application/json', 'image/png'],
  definitions: {
    Quote: {
      id: 1,
      character: 'Fleabag',
      quote: 'Hair is everything.',
    },
  },
};

const outputFile = './src/swagger/swagger_output.json';
const endpointsFiles = [path.join(__dirname, '../routes/quotes.js')];

swaggerAutogen()(outputFile, endpointsFiles, doc);
