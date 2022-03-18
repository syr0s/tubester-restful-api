import { Request, Response, Router } from "express";
import EndpointAuth from "../endpoints/auth";
import EndpointRoot from "../endpoints/root";
import Routes from "../interfaces/routes";

export class V1 extends Routes {

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
        this.router.all('/auth', (request: Request, response: Response) => {
            new EndpointAuth(request, response).method();
        });
    }
}