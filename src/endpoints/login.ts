import { Request, Response } from "express";
import Authentication from "../interfaces/authentication";

class EndpointLogin extends Authentication {
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    protected override get(): void {
        this.login();
    }
}

export default EndpointLogin;