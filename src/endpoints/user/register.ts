import { Request, Response } from "express";
import crypto from 'crypto';
import config from "../../config/main";
import Authentication from "../../interfaces/authentication";
import { UserInterface } from "../../models/user";
import logger from "../../config/logger";

export class EndpointUserRegister extends Authentication {
    /**
     * The endpoint `/user/register` is used to register a new user account on the backend. 
     * The feature can be switched off, by setting the environment variable `REGISTRATION_ENABLED: 
     * false`. It is possible to activate a two factor authentication, which requires the user to 
     * confirm the account creation, by receiving a link on the passed in e-mail address. This 
     * feature can be deactivated, by setting the environment variable `TWO_FACTOR_AUTH: false`. 
     * The feature requires a propper e-mail setup, otherwise the server will not start.
     * @param request 
     * @param response 
     */
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    /**
     * This is the endpoint for registring a new user on the backend. The endpoint
     * is typically used on your `register` page inside your application.
     */
     protected put(): void {
        if (config.REGISTRATION_ENABLED) {
            if (this.validatePayload(['email', 'passwordHash'], this.request.body)) {
                this.userController.readOne(this.request.body.username).then((result) => {
                    if(!result) {
                        const data:UserInterface = {
                            email: this.request.body.email,
                            passwordHash: this.request.body.passwordHash,
                            // always set userGroup to 0 which is a normal user
                            userGroup: 0,
                            firstName: this.request.body.firstName || '',
                            lastName: this.request.body.lastName || '',
                            createdAt: Date.now(),
                            active: true,
                        } as UserInterface;
                        if(config.TWO_FACTOR_AUTH) {
                            // TODO create and send email
                            const confirmEndpoint: string = 
                                this.request.body.username + config.API_KEY + this.request.body.passwordHash;
                            data.validated = false;
                            data.confirmEndpoint = crypto.createHmac('sha256', confirmEndpoint).digest('hex');
                        } else {
                            data.validated = true;
                        }
                        this.userController.create(data).catch((error) => {
                            logger.error(error);
                        });
                        this.status(201);
                        this.response.send();
                        return;
                    }
                });
            } else {
                this.status(400);
                return;
            }
        } else {
            this.status(405);
            return;
        }
        
    }
}