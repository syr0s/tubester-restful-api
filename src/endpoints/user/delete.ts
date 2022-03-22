import { Request, Response } from "express";
import logger from "../../config/logger";
import Authentication from "../../interfaces/authentication";

export class EndpointUserDelete extends Authentication {
    /**
     * The endpoint `/user/delete` provides the possiblity to delete the users own 
     * account on the backend. The user will be deleted without any further warning.
     * @param request 
     * @param response 
     */
    constructor(request: Request, response: Response) {
        super(request, response);
    }
    /**
     * `DELETE` method of the endpoint `/user/delete`. The method
     * deletes the user from the backend, using the `uuid` within
     * the [`json web token`](../../../docs/docs/data/jwt.md).
     */
     protected del(): void {
        if (this.validateJWT()) {
            this.userController.del(String(this.uuid)).catch((error) => {
                logger.error(error);
            });
            this.status(200);
            this.response.send();
        }
    }
}