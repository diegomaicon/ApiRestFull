import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes'

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);


app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction) => {
      
});

app.listen(3333, () => {
    console.log('Server started on port 3333! ')
})


