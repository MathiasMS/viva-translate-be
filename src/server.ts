import express, { json, urlencoded, Request, Response, NextFunction } from 'express';

import { publicRoutes, protectedRoutes } from './routes';
import getMongoDBConnection from './db/index';
import commonMiddlewares from './middlewares/index';
import { VIVA_APPLICATION_NODE_ENV, VIVA_APPLICATION_PORT, VIVA_APPLICATION_WEB_CONCURRENCY } from './config/config';
import cluster from 'cluster';
import { applyMiddleware } from './utils/applymiddlewares';
import errorHandlers from './middlewares/errorHandlers';

const app = express();

getMongoDBConnection();

// commonmiddlewares
applyMiddleware(app, commonMiddlewares);

publicRoutes(app);
protectedRoutes(app);

// error middlewares
applyMiddleware(app, errorHandlers);

if (cluster.isPrimary && VIVA_APPLICATION_NODE_ENV !== 'development') {
    console.log(`[STARTUP] VIVA API Master ${process.pid} Running on ${VIVA_APPLICATION_PORT}`);

    // Fork workers
    for (let i = 0; i < VIVA_APPLICATION_WEB_CONCURRENCY; i += 1) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`[SHUTDOWN] VIVA API Worker ${worker.process.pid} died`);
        console.log(`[SHUTDOWN] VIVA API Signal ${signal}`);

        cluster.fork();
    });
} else {
    app.listen(VIVA_APPLICATION_PORT, () => {
        console.log(`[STARTUP] VIVA API ${process.pid} Running on ${VIVA_APPLICATION_PORT}`);
    });
}
