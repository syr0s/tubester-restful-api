import { Request, Response } from "express";
import { UserController } from '../controller/user';
import jwt from 'jsonwebtoken'
import config from "../config/main";
import Endpoint from "./endpoint";
import Controller from "./controller";
import logger from "../config/logger";

abstract class Authentication extends Endpoint {
    private jwtSecretKey: string;
    private jwtTokenHeaderKey: string;
    private userController: Controller = new UserController();

    constructor(request: Request, response: Response) {
        super(request, response);
        this.jwtSecretKey = config.JWT_SECRET_KEY;
        this.jwtTokenHeaderKey = config.JWT_TOKEN_HEADER_KEY;
    }

    /**
     * Challenge the provided credentials against the database. If the
     * client has send valid credentials, the login method will send
     * a json web token.
     */
    protected login(): void {
        if (!this.hasKey(this.request.body, 'username')) this.status(400);
        if (!this.hasKey(this.request.body, 'passwordHash')) this.status(400);
        if(this.empty(this.request.body.username)) this.status(400);
        if(this.empty(this.request.body.passwordHash)) this.status(400);
        this.userController.readOne(this.request.body.username).then((result) => {
            if (this.empty(result)) this.status(401);
            if (this.request.body.passwordHash != result.passwordHash) {
                this.status(403);
                return;
            }  
            this.createJWT(result._uid);
         });
    }

    /**
     * Create a json web token
     * @param userId the user id (_id in MongoDB)
     */
    protected createJWT(userId: string): void {
        let data = {
            time: Date(),
            userId: userId,
        }
        try {
            const token = jwt.sign(data, this.jwtSecretKey);
            this.status(200);
            this.response.send(token);
        } catch(error) {
            logger.error(error);
            this.status(404);
        }
    }
    protected validateJWT(): void {}
}

export default Authentication;