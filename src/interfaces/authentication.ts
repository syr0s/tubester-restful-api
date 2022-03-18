import { Request, Response } from "express";
import config from "../config/main";
import Endpoint from "./endpoint";

abstract class Authentication extends Endpoint {
    private jwtSecretKey: string;
    private jwtTokenHeaderKey: string;

    constructor(request: Request, response: Response) {
        super(request, response);
        this.jwtSecretKey = config.JWT_SECRET_KEY;
        this.jwtTokenHeaderKey = config.JWT_TOKEN_HEADER_KEY;
    }

    protected login(): void {}
    protected createJWT(): void {}
    protected validateJWT(): void {}
}

export default Authentication;