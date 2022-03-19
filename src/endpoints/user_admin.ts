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
     * `GET` method of the endpoint `/v1/user/admin`. Provides all user
     * data stored on the backend to the client. The endpoint is only
     * accessable for users in the `userGroup` `1`, all other requests
     * will be denied with http status code `403 - Forbidden`.
     * ### Request header
     * Requires a Bearer token header. Otherwise the endpoint will respond
     * with http status code `401 - Unauthicated`.
     * ### Response
     * Will respond with `content-type: application/json` and http
     * status code `200 - OK`. The response will have the following body:
     * - `username`: The username of stored in the record.
     * - `uuid`: The unique user id of the user.
     */
    protected get(): void {
        if (this.validateJWT()) {
            if (this.userGroup === 1) {
                const projection = {
                    passwordHash: 0,
                    __v: 0
                };
                this.userController.readAll(projection).then((result) => {
                    this.setHeaderJson();
                    this.status(200);
                    this.response.send(result);
                    return;
                });
                return;
            } else {
                this.status(403);
                return;
            }
        }
    }
}

export default EndpointUserAdmin;