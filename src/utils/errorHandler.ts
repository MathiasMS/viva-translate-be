import { NextFunction, Response, Request } from 'express';
import { HTTP404Error, HTTPClientError } from './httpErrors';
import { VIVA_APPLICATION_NODE_ENV } from '../config/config';

export const notFoundError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HTTP404Error) {
        res.status(err.statusCode).send(err.message);
    } else {
        return next(err);
    }
};

export const clientError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HTTPClientError) {
        res.status(err.statusCode).send(err.message);
    } else {
        return next(err);
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const serverError = (err: Error, res: Response, next: NextFunction) => {
    if (VIVA_APPLICATION_NODE_ENV === 'production') {
        res.status(500).send('Internal Server Error');
    } else {
        res.status(500).send(err.stack);
    }
};
