import authentication from './public/authentication.route';
import quizzes from './protected/quizzes/quizzes.routes';
import { Application } from 'express';
import { validate } from '../middlewares/authenticaton';

const API_BASE_URL: string = '/api';

const publicRoutes = (app: Application) => {
    app.use(`${API_BASE_URL}/authentication`, authentication);
};

const protectedRoutes = (app: Application) => {
    app.use(`${API_BASE_URL}/quizzes`, validate, quizzes);
};

export { publicRoutes, protectedRoutes };
