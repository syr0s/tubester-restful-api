import { Request, Response } from "express";
import crypto from 'crypto';
import config from "../config/main";
import Authentication from "../interfaces/authentication";

class EndpointUser extends Authentication {

    /**
     * User endpoint of the RESTful API which is reachable at
     * `/v1/user`. The endpoint provides the following methods:
     * - `GET`: Returns the user data of the requesting user
     * - `POST`: Updates the user data of the requesting user
     * - `PUT`: Creates a new user account on the backend
     * - `DELETE`: Deletes a user account on the backend
     * @param request express.js `Request` object 
     * @param response exporess.js `Response` object
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
            if (this.validatePayload(['username', 'passwordHash'], this.request.body)) {
                this.userController.readOne(this.request.body.username).then((result) => {
                    if(!result) {
                        const data:any = {
                            username: this.request.body.username,
                            passwordHash: this.request.body.passwordHash,
                            // always set userGroup to 0 which is a normal user
                            userGroup: 0,
                            timestampCreation: Date.now(),
                        }
                        if(config.TWO_FACTOR_AUTH) {
                            // TODO create and send email
                            const tmpValidationEndpoint: string = 
                                this.request.body.username + config.API_KEY + this.request.body.passwordHash;
                            data.tmpAccount = config.TWO_FACTOR_AUTH;
                            data.tmpValidationEndpoint = crypto.createHmac('sha256', tmpValidationEndpoint).digest('hex');
                        }
                        this.userController.create(data);
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
    
    /**
     * `DELETE` method of the endpoint `/v1/user`. Will delete the user which is given in 
     * the request body object.
     * ### Request header
     * Requires a Bearer token header. Otherwise the endpoint will respond
     * with http status code `401 - Unauthicated`.
     * ### Request body
     * The method requires the `uuid` as body parameter. Requesting this method without a
     * valid `uuid` will cause a server response `400 - Bad Request`.
     * ### Response
     * The endpoint will respond with http status code `200 - OK` on successfully deleted
     * user account.
     */
    protected del(): void {
        if (this.validateJWT()) {
            if (this.validatePayload(['uuid'], this.request.body)) {
                this.userController.readById(this.request.body.uuid).then((result) => {
                    console.log(result)
                    if (this.hasKey(result, 'username')) {
                        this.userController.del(this.request.body.uuid);
                        this.status(200);
                        this.response.send();
                    } else {
                        this.status(400);
                    }
                }) 
            }
        }
    }
}

export default EndpointUser;