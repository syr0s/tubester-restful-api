import { Request, Response } from "express";
import Authentication from "../../interfaces/authentication";
import { UserInterface } from "../../models/user";

export class EndpointAdminData extends Authentication {
    private supportedRequestBody: string[] = [
        'email', 'userGroup', 'firstName', 'lastName', 'active'
    ];
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

    /**
     * Update a certain user account.
     * @returns 
     */
    protected post(): void {
        if (this.validateJWT()) {
            if (this.userGroup == 1) {
                if (this.request.query.uuid) {
                    const data:any = {};
                    for (const key in this.request.body) {
                        if (this.supportedRequestBody.includes(key)) {
                            
                            data[key] = this.request.body[key];
                        }
                    }
                    this.userController.update(String(this.request.query.uuid), data);
                    this.status(200);
                    this.response.send();
                    return;
                } else {
                    this.status(400);
                    return;
                }  
            } else {
                this.status(403);
                return;
            }
        }
    }
}