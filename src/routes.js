import { Router } from 'express';
import cors from 'cors';

// CONTROLLERS
import webcamController from './app/controllers/webcamController';

const routes = new Router();
routes.use(cors());

// SESSION
routes.get('/', webcamController.store);

export default routes;
