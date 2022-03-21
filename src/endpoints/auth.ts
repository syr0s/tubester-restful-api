import { Request, Response } from "express";
import Authentication from "../interfaces/authentication";
import Jwt from "../interfaces/jwt";

class EndpointAuth extends Authentication {
    /**
     * Authentication endpoint of the RESTful API which is reachable
     * at `/v1/auth`. The endpoint provides two different methods:
     * - `GET`: Logs in a user on valid credentials
     * - `POST`: Renews the signed `json web token`
     * @param request express.js `Request` object 
     * @param response exporess.js `Response` object
     */
    constructor(request: Request, response: Response) {
        super(request, response);
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
            const data: Jwt = {
                time: Date.now(),
                uuid: String(this.uuid),
                userGroup: this.userGroup || 0,
            }
            if(this.uuid) this.createJWT(data);
        }
    }
}

export default EndpointAuth;