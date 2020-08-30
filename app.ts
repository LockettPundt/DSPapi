import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'
import loggingMiddleware from './middleware/middleware';
import { DB_URI, DB_NAME } from './config'

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: DB_NAME,
})
  .then(() => console.log(`connected to ${DB_NAME}`))
  .catch((err) => console.log(err));

const app = express();

app.use('/graphql', loggingMiddleware);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

export default app;
