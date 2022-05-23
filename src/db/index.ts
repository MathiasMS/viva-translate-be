import mongoose from 'mongoose';
import {
    VIVA_DATABASE_MONGO_HOST,
    VIVA_DATABASE_MONGO_DRIVER,
    VIVA_DATABASE_MONGO_PORT,
    VIVA_DATABASE_MONGO_DB,
    VIVA_DATABASE_MONGO_USER,
    VIVA_DATABASE_MONGO_PASSWORD,
    VIVA_APPLICATION_NODE_ENV,
} from '../config/config';

const getMongoDBConnection = async () => {
    let properties: string;
    let uri: string;

    // Using default values on development
    if (VIVA_APPLICATION_NODE_ENV === 'development') {
        properties = 'authSource=admin&retryWrites=true&w=majority';
        uri = `${VIVA_DATABASE_MONGO_DRIVER}://${VIVA_DATABASE_MONGO_HOST}:${VIVA_DATABASE_MONGO_PORT}/${VIVA_DATABASE_MONGO_DB}?${properties}`;
    } else {
        properties = 'retryWrites=true&w=majority';
        uri = `${VIVA_DATABASE_MONGO_DRIVER}+srv://${VIVA_DATABASE_MONGO_USER}:${VIVA_DATABASE_MONGO_PASSWORD}@${VIVA_DATABASE_MONGO_HOST}/${VIVA_DATABASE_MONGO_DB}?${properties}`;
    }

    try {
        await mongoose.connect(uri);
        console.log('Successful connection to Mongo');
    } catch (error) {
        console.log('Failed connection to mongo');
        console.log(error);
    }
};

export default getMongoDBConnection;
