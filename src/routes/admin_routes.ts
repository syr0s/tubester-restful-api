import { Request, Response, Router } from "express";
import { EndpointAdminRegister } from "../endpoints/admin/register";
import { EndpointAdminData } from "../endpoints/admin/data";
import Routes from "../interfaces/routes";
import { EndpointAdminDelete } from "../endpoints/admin/delete";

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
        this.router.all('/delete', (request: Request, response: Response) => {
            new EndpointAdminDelete(request, response).method();
        });
        this.router.all('/register', (request: Request, response: Response) => {
            new EndpointAdminRegister(request, response).method();
        });
    }
}