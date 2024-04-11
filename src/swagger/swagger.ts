import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Fleabag API',
    description: "Fleabag quote API. Get random quote from Phoebe Waller-Bridge's Fleabag.",
  },
  host: 'fleabag-quotes.livkndt.com',
  schemes: ['https'],
  produces: ['application/json', 'image/png'],
  definitions: {
    Quote: {
      id: 1,
      character: 'Fleabag',
      quote: 'Hair is everything.',
    },
  },
  basePath: '/quotes',
};

const outputFile = './src/swagger/swagger_output.json';
const endpointsFiles = [path.join(__dirname, '../routes/quotes.js')];

swaggerAutogen()(outputFile, endpointsFiles, doc);
