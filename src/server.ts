import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import app from './app';

const port: string | number = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);

app.use(helmet());

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
