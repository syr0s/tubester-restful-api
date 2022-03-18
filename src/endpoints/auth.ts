import { Request, Response } from "express";
import Authentication from "../interfaces/authentication";

class EndpointAuth extends Authentication {
    /**
     * Authentication endpoint of the RESTful API which is reachable
     * at `/v1/auth`. The endpoint provides four different methods:
     * - `GET`: Logs in a user on valid credentials
     * - `POST`: Renews the signed `json web token`
     * - `PUT`: Creates a new user account
     * - `DELETE`: Deletes a user account
     * @param request express.js `Request` object 
     * @param response exporess.js `Response` object
     */
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    /**
     * `GET` endpoint of `/v1/auth` which ressponse with a `json web token`
     * on valid credentials.
     * ### Request body
     * The endpoint requires the following body parameters. The endpoint
     * will respond with http status code `400 - Bad Request` on missing 
     * parameters. The endpoint will respond with http status code `401 -
     * Unauthicated` on invalid username and `403 - Forbidden` on invalid
     * password hash.
     * - `username`: The username to login as `string`
     * - `passwordHash`: The password hash of the user to login as `string`
     * ### Response
     * The endpoint response with the `json web token` in plain text and
     * http status code `200 - OK` on success.
     */
    protected override get(): void {
        this.login();
    }

    /** 
     * `POST` endpoint of `/v1/auth` which re-news the `json web token` on
     * a valid `jwt`.
     * ### Request header
     * Requires a Bearer token header. Otherwise the endpoint will respond
     * with http status code `401 - Unauthicated`.
     * ### Response
     * The endpoint response with a new generated `json web token` in plain
     * text and http status code `200 - OK` on success.
     */
    protected post(): void {
        if (this.validateJWT()) {
            if(this.uuid) this.createJWT(this.uuid);
        }
    }

    // TODO implement PUT endpoint
    // TODO implement DELETE endpoint
}

export default EndpointAuth;