import { Request, Response } from "express";
import logger from "../config/logger";
import { between } from "../utils/number";

abstract class Endpoint {
    /** Express.js `Request` object */
    protected request: Request;

    /** Express.js `Response` object */
    protected response: Response;

    /** Creates a new `Endpoint` instance. */
    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response;
    }

    /**
     * Will call the requested method of the endpoint. The RESTful API accepts, the
     * following request methods:
     * - `GET`: typically used to get some data from the server.
     * - `POST`: typically used to update data on the server.
     * - `PUT`: typically used to write new data on the server.
     * - `DELETE`: typically used to delete something on the server.
     * 
     * @throws an error on all other methods.
     * @public
     */
    public method(): void {
        switch(this.request.method) {
            case 'GET':
                this.get();
                break;
            case 'POST':
                this.post();
                break;
            case 'PUT':
                this.put();
                break;
            case 'DELETE':
                this.del();
                break;
            default:
                throw new Error(`Requested endpoint ${this.request.method} is not implemented for route ${this.request.path}`);
        }
    }

    /**
     * `GET` method for the endpoint. You have to override this method to use it,
     * otherwise it will respond with status code `405 - Method Not Allowed`.
     * 
     * @override
     * @protected
     */
    protected get(): void {
        this.logStatus(405);
    }

    /**
     * `POST` method for the endpoint. You have to override this method to use it,
     * otherwise it will respond with status code `405 - Method Not Allowed`.
     * 
     * @override
     * @protected
     */
    protected post(): void {
        this.logStatus(405);
    }

    /**
     * `PUT` method for the endpoint. You have to override this method to use it,
     * otherwise it will respond with status code `405 - Method Not Allowed`.
     * 
     * @override
     * @protected
     */
    protected put(): void {
        this.logStatus(405);
    }

    /**
     * `DELETE` method for the endpoint. You have to override this method to use it,
     * otherwise it will respond with status code `405 - Method Not Allowed`.
     * 
     * @override
     * @protected
     */
    protected del(): void {
        this.logStatus(405);
    }
    
    /**
     * Will log the status of the request. Will respond to the client, if the
     * http status code is related to a `Client error responses (400–499)`
     * or a `Server error responses (500–599)`. On `Successful responses (200–299)`
     * status codes, the method will only log the event.
     * 
     * @param status http status code of the operation
     * @throws error on not implemented status codes
     * @protected
     */
    protected logStatus(status: number): void {
        const msg: string = `Endpoint ${this.request.path} returns status ${status} for method ${this.request.method}`;
        switch(true) {
            case between(status, 200, 299):
                logger.info(msg);
                break;
            case between(status, 400, 499):
                logger.warn(msg);
                this.response.sendStatus(status);
                break;
            case between(status, 500,599):
                logger.error(msg);
                this.response.sendStatus(status);
                break;
            default:
                const err: string = `HTTP status code ${status} not implemented`;
                logger.error(err);
                throw Error(err);
        }
    }
}