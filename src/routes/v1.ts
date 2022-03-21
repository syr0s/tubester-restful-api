import { Request, Response, Router } from "express";
import EndpointRoot from "../endpoints/root";
import { EndpointUserData } from "../endpoints/user/data";
import { EndpointUserDelete } from "../endpoints/user/delete";
import { EndpointUserLogin } from "../endpoints/user/login";
import { EndpointUserRegister } from "../endpoints/user/register";
import { EndpointUserRenew } from "../endpoints/user/renew";
import EndpointUserAdmin from "../endpoints/user_admin";
import Routes from "../interfaces/routes";

// TODO change this to UserRoutes @ /user after finishing refactoring
export class V1Routes extends Routes {

    public router: Router = Router();

    /**
     * V1 route instance. This router handles the traffic to the version
     * 1 routes of the RESTful API. This aproach allows us to add more
     * routes with different behavior in later development of the API.
     * For example routes which are only supported in version 2.0.0 of
     * the client application.
     */
     constructor() {
        super();
        this.routes();
    }

    protected routes(): void {
        this.router.all('/', (request: Request, response: Response) => {
            new EndpointRoot(request, response).method();
        });

        this.router.all('/user/admin', (request: Request, response: Response) => {
            new EndpointUserAdmin(request, response).method();
        });

        /** ! New routes of the branch */
        this.router.all('/user/data', (request: Request, response: Response) => {
            new EndpointUserData(request, response).method();
        });
        this.router.all('/user/delete', (request: Request, response: Response) => {
            new EndpointUserDelete(request, response).method();
        });
        this.router.all('/user/login', (request: Request, response: Response) => {
            new EndpointUserLogin(request, response).method();
        });
        this.router.all('/user/register', (request: Request, response: Response) => {
            new EndpointUserRegister(request, response).method();
        });
        this.router.all('/user/renew', (request: Request, response: Response) => {
            new EndpointUserRenew(request, response).method();
        });
    }
}