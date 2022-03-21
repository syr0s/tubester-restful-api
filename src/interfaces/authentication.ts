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
    /** The usergroup the user belongs to */
    protected userGroup?: number;
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
        if (this.validatePayload(['email', 'passwordHash'], this.request.body)) {
            this.userController.readOne(this.request.body.email).then((result) => {
                if(this.validUser(result)) {
                    if (this.request.body.passwordHash != result.passwordHash) {
                        this.status(403);
                        return;
                    }  
                    this.uuid = result._id.toString();
                    const data: Jwt = {
                        time: Date.now(),
                        uuid: String(this.uuid),
                        userGroup: result.userGroup || 0,
                    };
                    this.createJWT(data);
                }  
            });
        }
    }

    /**
     * Create a json web token
     * @param userId the user id (_id in MongoDB)
     */
    protected createJWT(data: Jwt): void {
        try {
            const token = jwt.sign(data, this.jwtSecretKey);
            this.status(200);
            this.setHeaderJson();
            this.response.send({
                token: token,
                uuid: this.uuid,
            });
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
                    this.userGroup = verify.userGroup;
                return true;
                }
            }
        }
        this.status(401);
        return;
    }

    /**
     * Checks if the current user is a valid one, by checkiing
     * - contains the result object data
     * - is result.active `true`
     * - is result.validated `true`
     * @param result 
     * @returns 
     */
    protected validUser(result: any): void | boolean {
        if (!result) {
            this.status(404);
            return;
        }
        // TODO check if user is active
        if (!result.active) {
            this.status(400);
            return;
        }
        // TODO check if user is validated
        if (!result.validated) {
            this.status(400);
            return;
        }
        return true;
    }
}

export default Authentication;