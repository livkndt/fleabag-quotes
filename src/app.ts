import express, { Express } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger_output.json';
import quotesRouter from './routes/quotes';

const app: Express = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);

app.use(helmet());

app.use('/quotes', quotesRouter);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
