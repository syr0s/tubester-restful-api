import { Request, Response } from "express";
import Authentication from "../../interfaces/authentication";

export class EndpointAdminDelete extends Authentication {
    /**
     * Deletes a given user account from the backend, if present.
     * @param request 
     * @param response 
     */
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    /**
     * Deletes a user account from the backend.
     * @returns 
     */
    protected del(): void {
        if (this.validateJWT()) {
            if (this.userGroup == 1) {
                if (this.request.query.uuid) {
                    this.userController.readById(String(this.request.query.uuid)).then((result) => {
                        if (!result) {
                            this.status(400);
                            return;
                        } else {
                            this.userController.del(String(this.request.query.uuid));
                            this.status(200);
                            this.response.send();
                        }
                    })
                } else {
                    this.status(400);
                }
            } else {
                this.status(403);
                return;
            }
        }
    }
}