import 'dotenv/config';
import fs from 'fs';
import ini from 'ini';
import Configuration from "../interfaces/config";

// Load and process `.env` file.
require('dotenv').config();

// Read `config.ini` file.
const configFile = ini.parse(fs.readFileSync(`${__dirname}/config.ini`, 'utf-8'));

/**
 * The main server configuration of the RESTful API.
 * The server side configuration is done by using two different files:
 * - `.env`: Holds all variables which the user may want to change on his own
 * needs.
 * - `config.ini`: A dedicated configuration file, which typically did not get
 * changed by the user. The `config.ini` contains settings, which may brake the
 * server if setted up wrong.
 */
const config: Configuration = {
    SERVER_NAME: process.env.SERVER_NAME || 'Tubester',
    SERVER_VERSION: process.env.SERVER_VERSION || 'n.a.',
    SERVER_PORT: Number(process.env.SERVER_PORT) || 3000,
    DEBUG: Boolean(process.env.DEBUG) || false,
    LOG_TO_FILE: Boolean(process.env.LOG_TO_FILE) || true,
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    LOG_PATH: configFile.logging.path || 'logs',
    LOG_FILE: configFile.logging.file || 'api_def.log',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
    JWT_TOKEN_HEADER_KEY: process.env.JWT_TOKEN_HEADER_KEY || '',
}

// Throw an error if `JWT_SECRET_KEY` is not set
if (config.JWT_SECRET_KEY.length == 0) {
    throw new Error('JWT_SECRET_KEY is empty please set up a value using environment variable');
}
// Throw an error if `JWT_TOKEN_HEADER_KEY` is not set
if (config.JWT_TOKEN_HEADER_KEY.length == 0) {
    throw new Error('JWT_TOKEN_HEADER_KEY is empty please set up a value using environment variable');
}

export default config;