import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { Application } from 'express';
import helmet from 'helmet';

export const handleCors = (app: Application) => {
    app.use(cors({ credentials: true, origin: true }));
};

export const handleBodyRequestParsing = (app: Application) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
};

export const handleCompression = (app: Application) => {
    app.use(compression());
};

export const handleHelmet = (app: Application) => {
    app.use(helmet());
};
