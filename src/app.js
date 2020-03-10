import 'dotenv/config';

import express from 'express';
import { resolve } from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import cors from 'cors';
import sentryConfig from './config/sentry';
import routes from './routes';

import 'express-async-errors';
import './database';

class App {
  constructor() {
    this.app = express();

    Sentry.init(sentryConfig);

    this.middleware();
    this.routes();
    this.exceptionHandler();
  }

  middleware() {
    this.app.use(Sentry.Handlers.requestHandler());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'upload'))
    );
  }

  routes() {
    this.app.use(routes);
    this.app.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.app.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(400).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().app;
