import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/quotes/random', (req: Request, res: Response) => {
  res.json("I'm not a bad guy. I just have a bad personality.");
});

export default app;
