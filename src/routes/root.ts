import { Request, Response, Router } from "express";
import EndpointRoot from "../endpoints/root";
import Controller from "../interfaces/controller";
import Routes from "../interfaces/routes";

export class RootRoutes extends Routes {

    public router: Router = Router();

     constructor() {
        super();
        this.routes();
    }

    protected routes(): void {
        this.router.all('/', (request: Request, response: Response) => {
            new EndpointRoot(request, response).method();
        });
    }
}