// Import the express in typescript file
import express from 'express';
import logger from './config/logger';
import EndpointRoot from './endpoints/root';
 
// Initialize the express engine
const app: express.Application = express();
 
// Take a port 3000 for running server.
const port: number = 3000;
 
// Handling '/' Request
app.all('/', (_req, _res) => {
    new EndpointRoot(_req, _res).method();
});
 
// Server setup
app.listen(port, () => {
    logger.info(`TypeScript with Express http://localhost:${port}/`);
});