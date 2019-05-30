import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import restRouter from './api/restRouter';
import questionerDoc from '../../swagger.json';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(logger('dev'));

app.use('/api/v1', restRouter);
app.use('/api-docs', swagger.serve, swagger.setup(questionerDoc));
app.get('/*', (req, res) => {
  res.status(200).json({ message: 'Welcome to REST API for Questioner App' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`APi Listerning on Port ${port}`);
});

export default app;
