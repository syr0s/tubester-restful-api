import { Request, Response, Router } from "express";
import Controller from "./controller";

abstract class Routes {
    /** Express.js `Router` object */
    public abstract router: Router;

    /** Create routes */
    protected abstract routes(): void;
}

export default Routes;