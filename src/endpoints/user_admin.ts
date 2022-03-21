import { Request, Response } from "express-serve-static-core";
import Authentication from "../interfaces/authentication";

class EndpointUserAdmin extends Authentication {
    /**
     * User/admin endpoint of the RESTful API which is reachable at
     * `/v1/user/admin`. The endpoint provides the following methods:
     * - `GET`: Returns the user data of all users stored on the backend.
     * @param request 
     * @param response 
     */
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    

    /**
     * `PUT` method of the endpoint `/v1/user/admin`, which creates a new user
     * account on the backend. 
     * ### Request header
     * Requires a Bearer token header. Otherwise the endpoint will respond
     * with http status code `401 - Unauthicated`.
     * ### Request body
     * The endpoint requires the following parameters as request body, requests
     * misisng this information, will be responded with http status code `400 -
     * Bad Request`.
     * - `username`: the username for the new account. If the passed in username
     * allready exists, the endpoint will respond with http status code `401 -
     * Bad Request`.
     * - `passwordHash`: the password hash for the new account.
     * ### Response
     * The endpoint will respond with http status code `201 - Created` on success.
     */
     protected put(): void {
        if (this.validateJWT()) {
            if (this.validatePayload(['username', 'passwordHash', 'userGroup'], this.request.body)) {
                this.userController.readOne(this.request.body.username).then((result) => {
                    if (!result) {
                        const data: object = {
                            username: this.request.body.username,
                            passwordHash: this.request.body.passwordHash,
                            userGroup: this.request.body.userGroup,
                        };
                        this.userController.create(data);
                        this.status(201);
                        this.response.send();
                    } else {
                        this.status(400);
                    }
                });
            }
        }
    }
}

export default EndpointUserAdmin;