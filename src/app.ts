import express, { Express } from 'express';
import quotesRouter from './routes/quotes';

const app: Express = express();

app.use('/quotes', quotesRouter);

export default app;
