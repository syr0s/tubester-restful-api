import mongoose from "mongoose";
import logger from "../config/logger";

import config from "../config/main";
import Database from "../interfaces/database";

class MongoDB {
    /** MongoDB connection URI */
    private uri: string;
    /** Default MongoDB connection options */
    private connectionOptions: object = {
        keepAlive: true,
        socketTimeoutMS: 3000,
        connectTimeoutMS: 3000,
        auth: {
            username: config.MONGODB_USER,
            password: config.MONGODB_PASSWORD,
        },
        dbName: config.MONGODB_DATABASE,
    };

    /**
     * Creates a new `MongoDB` instance.
     * The credentials to access the MongoDB instance are
     * loaded using the `conf`constant.
     */
    constructor() {
        if (config.MONGODB_PASSWORD === 'exampleP4ssword') {
            logger.warn('Warning! You are using the default password for MongoDB. You really should change this ...');
        }
        this.uri = `mongodb://${config.MONGODB_HOST}:${config.MONGODB_PORT}`;
    }

    /**
     * Establish a connection to the MongoDB instance. Creates event
     * listeners for the different states the instance could have and
     * log those events.
     */
    public connect(): void {
        const connection = mongoose.connection;
        connection.on('connected', () => {
            logger.info('MongoDB connection established');
        });
        connection.on('reconnected', () => {
            logger.info('MongoDB connection reestablished');
        });
        connection.on('disconnected', () => {
            logger.warn('MongoDB connection disconnected');
            logger.info('Trying to reconnect to MongoDB...');
            setTimeout(() => {
                mongoose.connect(this.uri, this.connectionOptions);
            }, 3000);
        });
        connection.on('close', () => {
            logger.info('MongoDB connection closed');
        });
        connection.on('error', (error: Error) => {
            logger.error(`MongoDB error: ${error.message}`);
        });
        const run = async () => {
            await mongoose.connect(this.uri, this.connectionOptions);
        };
        run().catch(error => logger.error(error.message));
    }
    
}

export default MongoDB;