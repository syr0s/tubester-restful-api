// Import the express in typescript file
import express from 'express';
import logger from './config/logger';
 
// Initialize the express engine
const app: express.Application = express();
 
// Take a port 3000 for running server.
const port: number = 3000;
 
// Handling '/' Request
app.get('/', (_req, _res) => {
    _res.send("TypeScript With Expresss");
    console.log(_req.path)
});
 
// Server setup
app.listen(port, () => {
    logger.info(`TypeScript with Express http://localhost:${port}/`);
});