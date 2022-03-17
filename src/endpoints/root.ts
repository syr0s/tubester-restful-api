import { Request, Response } from "express";
import config from "../config/main";
import Endpoint from "../interfaces/endpoint";

class EndpointRoot extends Endpoint {
    /**
     * The root `/` endpoint of the RESTful API.
     * Will respond with some server metadata to the client.
     * The `/` endpoint should be accessable without any authentication.
     * The endpoint supports the following request methods:
     * - `GET`: Will deliver basic server metadata to the client
     * 
     * All other supported methods will respond with http status code
     * `405 - Method Not Allowed`.
     * 
     * @param request express.js `Request` object
     * @param response exporess.js `Response` object
     */
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    /**
     * `GET` endpoint of `/` which response with basic server
     * metadata.
     * ### Response
     * The endpoint response with `content-type application/json`. Which
     * contains the following data:
     * - `name`: the name of the server, which will be used as the name of
     * the application itself (type: `string`).
     * - `version`: the version the server is running on. This value may gets
     * used inside the application to determine the functionality which is
     * available (type: `string`).
     * - `debug`: Indicates that the server is running in debug mode or not.
     * This information is used to set up the application to debug mode also
     * (type: `boolean`).
     */
    protected override get(): void {
        const response: object = {
            name: config.SERVER_NAME,
            version: config.SERVER_VERSION,
            debug: config.DEBUG,
        };
        this.setHeaderJson();
        this.status(200);
        this.response.json(response);
    }
}

export default EndpointRoot;