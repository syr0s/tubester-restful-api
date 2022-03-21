import { Request, Response, Router } from "express";
import { EndpointAdminData } from "../endpoints/admin/data";
import Routes from "../interfaces/routes";

export class AdminRoutes extends Routes {

    public router: Router = Router();

    /**
     * Router for all routes located on `/user`.
     */
     constructor() {
        super();
        this.routes();
    }

    protected routes(): void {
        this.router.all('/data', (request: Request, response: Response) => {
            new EndpointAdminData(request, response).method();
        });
    }
}