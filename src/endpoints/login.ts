import { Request, Response } from "express";
import Authentication from "../interfaces/authentication";

class EndpointLogin extends Authentication {
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    /**
     * Login to the RESTful API. Will return a 
     * json web token on valid credentials.
     */
    protected override get(): void {
        this.login();
    }

    /** Demo only */
    protected post(): void {
        if (this.validateJWT()) {
            this.response.send({
                uuid: this.uuid
            });
        }
        
    }
}

export default EndpointLogin;