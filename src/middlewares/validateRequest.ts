import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { HTTP400Error } from '../utils/httpErrors';

function validateRequest<T>(type: any): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        validate(plainToInstance(type, req.body)).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const validationErrors: Array<string> = [];
                errors.forEach((error: ValidationError) => {
                    const constrains = error.constraints ? [...Object.values(error.constraints)] : [];
                    validationErrors.push(...constrains);
                });

                return next(new HTTP400Error(validationErrors));
            } else {
                return next();
            }
        });
    };
}

export default validateRequest;
