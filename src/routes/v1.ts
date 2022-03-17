import express, { Request, Response } from 'express';
import EndpointRoot from '../endpoints/root';

/**
 * This is the `Router` for all endpoints available
 * since version 1.0.0 of the RESTful API. We have choosen
 * this aproach to be able to add more endpoints to the
 * API in later releases. All `v1` endpoints are available
 * at: `<your-server>:<your-port>/v1/`.
 */
const v1 = express.Router();

/** Root endpoint of the RESTful API. */
v1.all('/', (request: Request, response: Response) => {
    new EndpointRoot(request, response).method();
});

export default v1;