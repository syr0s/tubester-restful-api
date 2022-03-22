import { Request, Response } from "express";
import Authentication from "../../interfaces/authentication";

export class EndpointAdminRegister extends Authentication {
    /** Optional body request arguments */
    private optionalBody: string[] = [
        'userGroup', 'firstName', 'lastName', 'active'
    ];
    
    /**
     * The endpoint `/admin/register` allows the administrator to register a new user 
     * account on the backend. Unlike the endpoint [`/user/register`](../../../docs/docs/endpoints/user/register.md), 
     * the endpoint is not influenced on the environment variables `TWO_FACTOR_AUTH` and 
     * `REGISTRATION_ENABLED`. If no argument for `userGroup` is provided, the endpoint 
     * will generate the user as normal user (user group `0`). If the argument `active` 
     * is not provided, the endpoint will generate the user with `active: true`.
     * @param request 
     * @param response 
     */
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    /**
     * Will create a new user on the backend.
     */
    protected put(): void {
        if (this.validateJWT()) {
            if (this.validatePayload(['email', 'passwordHash'], this.request.body)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const data:any = {
                    email: this.request.body.email,
                    passwordHash: this.request.body.passwordHash,
                    userGroup: 0,
                    createdAt: Date.now(),
                    validatedAt: Date.now(),
                    active: true,
                    validated: true,
                };
                for (const key in this.request.body) {
                    if (this.optionalBody.includes(key)) {
                        data[key] = this.request.body[key];
                    }
                }
                this.userController.readOne(data.email).then((result) => {
                    if (!result) {
                        this.userController.create(data);
                        this.status(201);
                        this.response.send();
                    } else {
                        this.status(400);
                    }
                });
            }
        } else {
            this.status(403);
            return;
        }
    }
}