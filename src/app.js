import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import 'dotenv/config';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
    this.server.use(routes);
  }
}

export default new App().server;
