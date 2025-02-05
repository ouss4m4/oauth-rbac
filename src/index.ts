import express, { json } from 'express';
import { apiV1Router } from './routes/v1';
import { connectDb } from './db';
import { authRouter } from './routes/auth.router';

const app = express();

// configs
app.use(json());
app.use(express.static('src/public', { extensions: ['html'] }));

// api routes
app.use('/api/v1', apiV1Router);
app.use('/auth', authRouter);

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log('app listening on port ', port);
});

connectDb().catch((err) => console.log(err));
