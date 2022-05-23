// Application variables
export const VIVA_APPLICATION_NODE_ENV: string = process.env.VIVA_APPLICATION_NODE_ENV || 'development';
export const VIVA_APPLICATION_WEB_CONCURRENCY: number =
    parseInt(`${process.env.VIVA_APPLICATION_WEB_CONCURRENCY}`, 10) || 1;
export const VIVA_APPLICATION_PORT: number = parseInt(`${process.env.PORT}`, 10) || 5000;

// Database variables
export const VIVA_DATABASE_MONGO_HOST: string = process.env.VIVA_DATABASE_MONGO_HOST || 'localhost';
export const VIVA_DATABASE_MONGO_DRIVER: string = process.env.VIVA_DATABASE_MONGO_DRIVER || 'mongodb';
export const VIVA_DATABASE_MONGO_PORT: number = parseInt(`${process.env.VIVA_DATABASE_MONGO_PORT}`, 10) || 2717;
export const VIVA_DATABASE_MONGO_DB: string = process.env.VIVA_DATABASE_MONGO_DB || 'viva';
export const VIVA_DATABASE_MONGO_USER: string = process.env.VIVA_DATABASE_MONGO_USER || '';
export const VIVA_DATABASE_MONGO_PASSWORD: string = process.env.VIVA_DATABASE_MONGO_PASSWORD || '';

//Auth variables
export const VIVA_AUTH_SECRET: string =
    process.env.VIVA_AUTH_SECRET || 'Kd9bJNvok3tNZgMGSoFiRtIUJhHGz6Db474EgowUJ8jI545rdE5q05aTJMM0W4H';
export const VIVA_AUTH_TOKEN_EXPIRATION_TIME: string = '1d';
