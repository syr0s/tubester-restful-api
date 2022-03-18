import { Request, Response } from "express";
import { UserController } from '../controller/user';
import jwt from 'jsonwebtoken'
import config from "../config/main";
import Endpoint from "./endpoint";
import Controller from "./controller";
import logger from "../config/logger";
import Jwt from "./jwt";

/**
 * While using the `Authentication` abstract class, you may want to wrap
 * your request methods inside an if-statement like:
 * ```typescript
 * if (this.validateJWT()) {
 *  // do fancy stuff
 * }
 * ```
 * Using this aproach, your endpoint is protected by requiring a valid
 * `json web token` from the client.
 */
abstract class Authentication extends Endpoint {
    private jwtSecretKey: string;
    protected userController: Controller = new UserController();
    /** The unique user id */
    protected uuid?: string;
    /** JWT token expires after 10 days */
    private expiry: number = 86400000 * 10;

    constructor(request: Request, response: Response) {
        super(request, response);
        this.jwtSecretKey = config.JWT_SECRET_KEY;
    }

    /**
     * Challenge the provided credentials against the database. If the
     * client has send valid credentials, the login method will send
     * a json web token.
     */
    protected login(): void {
        this.validatePayload();
        this.userController.readOne(this.request.body.username).then((result) => {
            if (this.empty(result)) this.status(401);
            if (this.request.body.passwordHash != result.passwordHash) {
                this.status(403);
                return;
            }  
            this.uuid = result._id.toString();
            this.createJWT(result._id.toString());
         });
    }

    /**
     * Create a json web token
     * @param userId the user id (_id in MongoDB)
     */
    protected createJWT(userId: string): void {
        let data:Jwt = {
            time: Date.now(),
            uuid: userId,
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

    /**
     * Validates a passed in json web token
     * @returns `true` or send http status `401` to the client
     */
    protected validateJWT(): boolean | void {
        const authHeader = this.request.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const verify:any = jwt.verify(token, this.jwtSecretKey);
            if (verify) {
                if (verify.time + this.expiry > Date.now()) {
                    this.uuid = verify.uuid;
                return true;
                }
            }
        }
        this.status(401);
        return;
    }

    /**
     * Validate that the given payload contains the keys `username` and
     * `passwordHash` and that the keys contains values.
     */
    protected validatePayload(): void {
        if (!this.hasKey(this.request.body, 'username')) {
            this.status(400);
            return;
        }
        if (!this.hasKey(this.request.body, 'passwordHash')) {
            this.status(400);
            return;
        }
        if(this.empty(this.request.body.username)) {
            this.status(400);
            return;
        }
        if(this.empty(this.request.body.passwordHash)) {
            this.status(400);
            return;
        }
        return;
    }
}

export default Authentication;