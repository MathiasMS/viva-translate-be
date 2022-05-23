import { Application, NextFunction, Request, Response, Router } from 'express';
import * as errorHandler from '../utils/errorHandler';

const handle404Error = (app: Application) => {
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(err.message, err.stack);
        errorHandler.notFoundError(err, req, res, next);
    });
};

export const handleClientError = (app: Application) => {
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        const errorMessage = `${err.message} - ${req.protocol}://${req.headers.host}${req.originalUrl}`;
        console.log(errorMessage, err.stack);
        errorHandler.clientError(err, req, res, next);
    });
};

const handleServerError = (app: Application) => {
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(err.message, err.stack);
        errorHandler.serverError(err, res, next);
    });
};

export default [handle404Error, handleClientError, handleServerError];
