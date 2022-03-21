import { Request, Response } from "express";
import Authentication from "../../interfaces/authentication";
import Jwt from "../../interfaces/jwt";

export class EndpointUserRenew extends Authentication {
    /**
     * Renew an existing [`json web token`](../../../docs/docs/data/jwt.md) . This will 
     * issue a new [`json web token`](../../../docs/docs/data/jwt.md)  to increase the 
     * expiry time. The old one, is still valid, until the expiry time (`10` days after 
     * issuing) has expired. This endpoint is typically called, to avoid re-logins required 
     * by the user.
     * 
     * If the client did not have a valid token, use the endpoint 
     * [`/user/login`](../../../docs/docs/endpoints/user/login.md) to authenticate the user 
     * first.
     * @param request 
     * @param response 
     */
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    /** 
     * `GET` endpoint of `/user/renew` which re-news the `json web token` on
     * a valid `jwt`.
     * ### Request header
     * Requires a Bearer token header. Otherwise the endpoint will respond
     * with http status code `401 - Unauthicated`.
     * ### Response
     * The endpoint response with a new generated `json web token` in plain
     * text and http status code `200 - OK` on success.
     */
     protected get(): void {
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