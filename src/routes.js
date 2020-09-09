import { Router } from 'express';
import cors from 'cors';

import UserController from './app/controllers/UserController';
import TestController from './app/controllers/TestController';
import GradeController from './app/controllers/GradeController';
import AuthController from './app/controllers/AuthController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
routes.use(cors());

routes.get('/', (req, res) => {
  res.json({ result: 'teste API' });
});

// ROUTE USER
routes.post('/users', UserController.store);

// ROUTE AUTH
routes.post('/login', AuthController.store);

routes.use(authMiddleware);

// ROUTES TEST (AUTH)
routes.post('/tests', TestController.store);
routes.get('/tests', TestController.index);
routes.get('/tests/:uid', TestController.show);
routes.delete('/tests/:uid', TestController.delete);
routes.put('/tests/:uid', TestController.update);

// ROUTES GRADE (AUTH)
routes.post('/grades', GradeController.store);
routes.get('/grades', GradeController.index);
routes.get('/grades/:uid', GradeController.show);
routes.delete('/grades/:uid', GradeController.delete);
routes.put('/grades/:uid', GradeController.update);

// ROUTES USER (AUTH)
routes.put('/users/:uid', UserController.update);
routes.get('/users', UserController.index);
routes.get('/users/:uid', UserController.show);

export default routes;
