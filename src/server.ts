import express from 'express';
import compression from 'compression';
import cors from 'cors';
import config from './config/main';
import logger from './config/logger';
import MongoDB from './database/mongodb';
import { V1 } from './routes/v1';
import Routes from './interfaces/routes';

class Server {
    public app: express.Application;
    private mongodb: MongoDB = new MongoDB();
 
    /**
     * Creates a new server instance.
     */
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    /**
     * Configuration of the backend server.
     */
    private config(): void {
        this.app.set('port', config.SERVER_PORT);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(compression());
        this.app.use(cors());
    }
    
    /**
     * Setup routing on the server.
     */
    private routes(): void {
        this.app.use('/v1', new V1().router);
    }

    /**
     * Starts the server.
     */
    public start(): void {
        this.mongodb.connect();
        this.app.listen(config.SERVER_PORT, () => {
            logger.info(`RESTful API listen on http://localhost:${config.SERVER_PORT}/`);
        });
    }
}

export default Server;