import { Request, Response } from "express";
import Authentication from "../../interfaces/authentication";

export class EndpointUserLogin extends Authentication {
    /**
     * Login an existing user on the RESTful API. After the successfull validation of
     * the credentials, the endpoint will issue a new [`json web token`](../../../docs/docs/data/jwt.md) 
     * and sends it to the requesting client. The [`json web token`](../../../docs/docs/data/jwt.md) is 
     * required to access protected endpoints and is valid for `10` days after issuing. 
     * It is possible to re-new the [`json web token`](../../../docs/docs/data/jwt.md) using the 
     * [`/user/renew`](../../../docs/docs/endpoints/user/renew.md) endpoint of the RESTful API.
     * @param request 
     * @param response 
     */
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    /**
     * `GET` endpoint of `/user/login` which ressponse with a `json web token`
     * on valid credentials.
     * ### Request body
     * The endpoint requires the following body parameters. The endpoint
     * will respond with http status code `400 - Bad Request` on missing 
     * parameters. The endpoint will respond with http status code `401 -
     * Unauthicated` on invalid email and `403 - Forbidden` on invalid
     * password hash.
     * - `email`: The email to login as `string`
     * - `passwordHash`: The password hash of the user to login as `string`
     * ### Response
     * The endpoint response with the `json web token` in plain text and
     * http status code `200 - OK` on success.
     */
     protected override get(): void {
        this.login();
    }
}