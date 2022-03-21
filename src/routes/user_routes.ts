import { Request, Response, Router } from "express";
import { EndpointUserConfirm } from "../endpoints/user/confirm";
import { EndpointUserData } from "../endpoints/user/data";
import { EndpointUserDelete } from "../endpoints/user/delete";
import { EndpointUserLogin } from "../endpoints/user/login";
import { EndpointUserRegister } from "../endpoints/user/register";
import { EndpointUserRenew } from "../endpoints/user/renew";
import Routes from "../interfaces/routes";

export class UserRoutes extends Routes {

    public router: Router = Router();

    /**
     * Router for all routes located on `/user`.
     */
     constructor() {
        super();
        this.routes();
    }

    protected routes(): void {
        this.router.all('/confirm', (request: Request, response: Response) => {
            new EndpointUserConfirm(request, response).method();
        });
        this.router.all('/data', (request: Request, response: Response) => {
            new EndpointUserData(request, response).method();
        });
        this.router.all('/delete', (request: Request, response: Response) => {
            new EndpointUserDelete(request, response).method();
        });
        this.router.all('/login', (request: Request, response: Response) => {
            new EndpointUserLogin(request, response).method();
        });
        this.router.all('/register', (request: Request, response: Response) => {
            new EndpointUserRegister(request, response).method();
        });
        this.router.all('/renew', (request: Request, response: Response) => {
            new EndpointUserRenew(request, response).method();
        });
    }
}