import express from 'express';
import compression from 'compression';
import cors from 'cors';
import config from './config/main';
import logger from './config/logger';
import MongoDB from './database/mongodb';
import { UserRoutes } from './routes/user_routes';
import FatalError from './utils/error_handler';
import Controller from './interfaces/controller';
import { UserController } from './controller/user';
import { AdminRoutes } from './routes/admin_routes';
import { RSA } from './utils/rsa';

class Server {
    public app: express.Application;
    private mongodb: MongoDB = new MongoDB();
    private userController: Controller = new UserController();
    private rsa: RSA = new RSA();
 
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
        this.app.use('/admin', new AdminRoutes().router);
        this.app.use('/user', new UserRoutes().router);
    }

    /**
     * Self check before starting the server.
     */
    private selfCheck(): void {
        this.selfCheckJWT();
        this.selfCheckJWT();
        this.selfCheckEmail();
    }

    /** Check if a JWT_SECRET_KEY is set */
    private selfCheckJWT(): void {
        if (!config.JWT_SECRET_KEY || config.JWT_SECRET_KEY.length == 0) {
            throw new FatalError('JWT_SECRET_KEY is empty please set up a value using environment variable');
        }
    }
    
    /** Check if the email feature is enabled if server requires two factor auth */
    private selfCheckTwoFactor(): void {
        if (config.TWO_FACTOR_AUTH && !config.E_MAIL_FEATURE_ENABLED) {
            throw new FatalError('TWO_FACTOR_AUTH requires E_MAIL_FEATURE_ENABLED to true');
        }
    }

    /** Check for proper email setup */
    private selfCheckEmail(): void {
        if (config.E_MAIL_USE_OAUTH2) {
            if (
                !config.E_MAIL_USER ||
                !config.E_MAIL_PASSWORD ||
                !config.E_MAIL_CLIENT_ID ||
                !config.E_MAIL_CLIENT_SECRET ||
                !config.E_MAIL_REFRESH_TOKEN
            ) {
                throw new FatalError('E-Mail setup not completed! Please re-check your environment variables for a proper setup');
            }
        }
    }

    private setup(): void {
        this.userController.readAll().then((result) => {
            if (result.length == 0) {
                logger.warn('No user found. Creating default admin user.');
                logger.warn('email: admin / password: admin');
                logger.warn('Please change the credentials as soon as the setup has finished');
                this.userController.create({
                    email: 'admin',
                    passwordHash: 'admin',
                    userGroup: 1,
                    createdAt: Date.now(),
                    active: true,
                    validated: true,
                });
            }
        });
        logger.info('Initial server setup finished');
    }

    /**
     * Starts the server.
     */
    public start(): void {
        this.selfCheck();
        this.mongodb.connect();
        this.setup();
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