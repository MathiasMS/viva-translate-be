import { Application } from 'express';

type Wrapper = (app: Application) => void;

export const applyMiddleware = (app: Application, middlewareWrappers: Wrapper[]) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(app);
    }
};
