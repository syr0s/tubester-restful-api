import express from 'express';

import logger from './config/logger';
import config from './config/main';

import v1 from './routes/v1';
 

const server: express.Express = express();
 
// Use version 1 router
server.use('/v1', v1);
 
server.listen(config.SERVER_PORT, () => {
    logger.info(`TypeScript with Express http://localhost:${config.SERVER_PORT}/`);
});