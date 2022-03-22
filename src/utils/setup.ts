import logger from "../config/logger";
import config from "../config/main";
import { UserController } from "../controller/user";
import Controller from "../interfaces/controller";
import FatalError from "./error_handler";
import { rootDir } from "../constants";
import { OS } from "./os";

export class Setup {

    /** 
     * Array of required subdirectories within the project root.
     * Make sure to add all of this directories to your `.gitignore` and
     * `.dockerignore` files.
     */
     private directories: string[] = [
        '/.keys',
    ];

    private userController: Controller = new UserController();
    private os: OS = new OS();

    constructor() {
        this.selfCheck();
        this.defaultUser();
        this.createDirs();
    }

    private defaultUser(): void {
        logger.debug('Starting look up if any users are created on the backend');
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
            } else {
                logger.debug(`Found ${result.length} users on the backend, will not create default user`);
            }
        });
    }

    private createDirs(): void {
        for (let i = 0; i < this.directories.length; i++) {
            this.os.creteDir(rootDir + this.directories[i]);
        }
    }

    private selfCheck(): void {
        this.selfCheckJWT();
        this.selfCheckTwoFactor();
        this.selfCheckEmail();
        logger.info('Server self checked finished');
    }

    /** Check if a JWT_SECRET_KEY is set */
    private selfCheckJWT(): void {
        logger.debug('Checking if JWT_SECRET_KEY is set');
        if (!config.JWT_SECRET_KEY || config.JWT_SECRET_KEY.length == 0) {
            throw new FatalError('JWT_SECRET_KEY is empty please set up a value using environment variable');
        } else {
            logger.debug(`Found JWT_SECRET_KEY with length: ${config.JWT_SECRET_KEY.length}, recommended size: 64 characters`);
        }
    }

    /** Check if the email feature is enabled if server requires two factor auth */
    private selfCheckTwoFactor(): void {
        logger.debug('Checking if e-mail feature is enabled by activated two factor authentication'); 
        if (config.TWO_FACTOR_AUTH && !config.E_MAIL_FEATURE_ENABLED) {
            throw new FatalError('TWO_FACTOR_AUTH requires E_MAIL_FEATURE_ENABLED to true');
        } else {
            logger.debug(`TWO_FACTOR_AUTH set to: ${config.TWO_FACTOR_AUTH}`);
            logger.debug(`E_MAIL_FEATURE_ENABLED set to: ${config.E_MAIL_FEATURE_ENABLED}`);
        }
    }

    /** Check for proper email setup */
    private selfCheckEmail(): void {
        logger.debug('Checking e-mail setup');
        if (config.E_MAIL_USE_OAUTH2) {
            logger.debug('Server requires E_MAIL_USE_OAUTH2');
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
}