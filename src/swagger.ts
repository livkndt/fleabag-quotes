import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Fleabag API',
    description:
      "Fleabag quotes API. Get random quotes from Phoebe Waller-Bridge's Fleabag.",
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

const outputFile = './src/swagger_output.json';
const endpointsFiles = [path.join(__dirname, 'app.js')];

swaggerAutogen()(outputFile, endpointsFiles, doc);
