import express from 'express';
import compression from 'compression';
import cors from 'cors';
import config from './config/main';
import logger from './config/logger';
import MongoDB from './database/mongodb';
import { UserRoutes } from './routes/user_routes';
import { AdminRoutes } from './routes/admin_routes';
import { Setup } from './utils/setup';



class Server extends Setup {
    public app: express.Application;
    private mongodb: MongoDB = new MongoDB();
 
    /**
     * Creates a new server instance.
     */
    constructor() {
        super();
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
        this.app.use('/admin', new AdminRoutes().router);
        this.app.use('/user', new UserRoutes().router);
    }

    /**
     * Starts the server.
     */
    public start(): void {
        this.mongodb.connect();
        this.app.listen(config.SERVER_PORT, () => {
            logger.info(`RESTful API listen on http://localhost:${config.SERVER_PORT}/`);
        });
        if (config.DEBUG) {
            logger.warn('You are running the RESTful API in debug mode. Please disable this feature in production.');
        }
        if (config.API_KEY === 'example') {
            logger.warn('You are using the default value of the API_KEY variable. You should really set a different one in production');
        }
    }
}

export default Server;