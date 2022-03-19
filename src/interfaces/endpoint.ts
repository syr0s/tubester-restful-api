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
     * Will call the requested method of the endpoint. This is the main method
     * to call any endpoint of the RESTful API. The RESTful API accepts, the
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
        this.status(405);
    }

    /**
     * `POST` method for the endpoint. You have to override this method to use it,
     * otherwise it will respond with status code `405 - Method Not Allowed`.
     * 
     * @override
     * @protected
     */
    protected post(): void {
        this.status(405);
    }

    /**
     * `PUT` method for the endpoint. You have to override this method to use it,
     * otherwise it will respond with status code `405 - Method Not Allowed`.
     * 
     * @override
     * @protected
     */
    protected put(): void {
        this.status(405);
    }

    /**
     * `DELETE` method for the endpoint. You have to override this method to use it,
     * otherwise it will respond with status code `405 - Method Not Allowed`.
     * 
     * @override
     * @protected
     */
    protected del(): void {
        this.status(405);
    }
    
    /**
     * Will log the status of the request. Will respond to the client, if the
     * http status code is related to a `Client error responses (400–499)`
     * or a `Server error responses (500–599)`. On `Successful responses (200–299)`
     * status codes, the method will only log the event. The method will set the
     * status code of the `response` object to the provided status `number` in any
     * cases.
     * 
     * @param status http status code of the operation
     * @throws error on not implemented status codes
     * @protected
     */
    protected status(status: number): void {
        const msg: string = `Endpoint ${this.request.path} returns status ${status} for method ${this.request.method}`;
        this.response.statusCode = status;
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

    /**
     * Set the response header to `content-type: application/json`.
     */
    protected setHeaderJson(): void {
        this.response.set({
            'Content-Type': 'application/json',
        });
    }

    /**
     * Validates that the a given object contains a certain key
     * @param obj to validate
     * @param val search for
     * @returns boolean
     */
    protected hasKey<T>(obj: T, val: any): val is T[keyof T]  {
        for (let k in obj) {
            if (k == val) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if a given `string` is empty or not.
     * @param string `string` to check
     * @returns 
     */
    protected empty(string: string | any): boolean {
        if (string.length === 0) {
            return true;
        }
        return false;
    }

    /**
     * Validate that a given payload has all required keys and contains values.
     * Ignores all keys inside the payload which are not required.
     * @param keys required keys in the payload
     * @param payload to inspect
     */
     protected validatePayload(keys: string[], payload: any): boolean | void {
        for (let i: number = 0; i < keys.length; i++) {
            console.log(keys[i])
            console.log(payload)
            if (!this.hasKey(payload, keys[i])) {
                this.status(400);
                return;
            }
            // Check if the key contains any value
            if (this.empty(payload[keys[i]])){
                this.status(400);
                return;
            }
        }
        return true;
    }
}

export default Endpoint;