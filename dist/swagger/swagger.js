"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
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
const endpointsFiles = [path_1.default.join(__dirname, '../routes/quotes.js')];
(0, swagger_autogen_1.default)()(outputFile, endpointsFiles, doc);
//# sourceMappingURL=swagger.js.map