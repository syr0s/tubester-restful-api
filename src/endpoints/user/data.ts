import { Request, Response } from "express";
import logger from "../../config/logger";
import Authentication from "../../interfaces/authentication";

export class EndpointUserData extends Authentication {
    private supportedBodyArgs: string[] = [
        'email', 'passwordHash', 'firstName', 'lastName'
    ];
    /**
     * The endpoint `/user/data` provides two different functionalities. The `GET` method 
     * provides the posibility to request basic user information, excluded all confidential 
     * ones, for a certain user account. The `POST` method will update the loged in user 
     * account with the provided values.
     * @param request 
     * @param response 
     */
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    /**
     * `GET` method of the endpoint `/user/data` which response with `content-type:
     * application/json` containing the user data of a requested user account.
     * Requires the `request.query.uuid` parameter containing a valid / existing `uuid`.
     * 
     * The method will not return any confidential data properties to the client.
     * 
     * See the [documentation](../../../docs/docs/endpoints/user/data.md) for further
     * information.
     */
    protected get(): void {
        if(this.validateJWT()) {
            if (!this.request.query.uuid) {
                this.status(400);
                return;
            }
            // Exclude all confidential data
            const projection = {
                passwordHash: 0,
                userGroup: 0,
                __v: 0
            }
            this.userController.readById(String(this.request.query.uuid), projection).then((result) => {
                if (this.validUser(result)) {
                    this.setHeaderJson();
                    this.status(200);
                    this.response.send({
                        uuid: result._id,
                        email: result.email,
                        firstName: result.firstName,
                        lastName: result.lastName,
                    });
                }
            });
        }
    }

    /**
     * `POST` method for the endpoint `/user/data`. Updates the current user to the
     * new data received within the `request.body`. Will only performs updates on supported
     * body arguments.
     * - `email`: The email address to change, if the e-mail address exists on the backend,
     * the API will respond with `400 - Bad Request`.
     * - `passwordHash`: The changed `sha-256` hash of the password.
     */
    protected post(): void {
        if (this.validateJWT()) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data:any = {};
            for (const key in this.request.body) {
                if (this.supportedBodyArgs.includes(key)) {
                    data[key] = this.request.body[key];
                }
            }
            if (this.hasKey(data, 'email')) {
                console.log(data.email)
                this.userController.readOne(data.email).then((result) => {
                    if (result) {
                        this.status(400);
                        return;
                    } else {
                        this.userController.update(String(this.uuid), data).catch((error) => {
                            logger.error(error);
                        });
                        this.setHeaderJson();
                        this.status(200);
                        this.response.send();
                    }
                });
            } else {
                this.userController.update(String(this.uuid), data);
                        this.status(200);
                        this.response.send();
            }
        }
    }
}