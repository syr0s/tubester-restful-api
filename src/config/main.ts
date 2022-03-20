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
    REGISTRATION_ENABLED: Boolean(process.env.REGISTRATION_ENABLED) || true,
    TWO_FACTOR_AUTH: Boolean(process.env.TWO_FACTOR_AUTH) || false,
    E_MAIL_FEATURE_ENABLED: Boolean(process.env.E_MAIL_FEATURE_ENABLED) || true,
    E_MAIL_SERVICE: process.env.E_MAIL_SERVICE,
    E_MAIL_USER: process.env.E_MAIL_USER,
    E_MAIL_PASSWORD: process.env.E_MAIL_PASSWORD,
    E_MAIL_USE_OAUTH2: Boolean(process.env.E_MAIL_USE_OAUTH2) || false,
    E_MAIL_CLIENT_ID: process.env.E_MAIL_CLIENT_ID,
    E_MAIL_CLIENT_SECRET: process.env.E_MAIL_CLIENT_SECRET,
    E_MAIL_REFRESH_TOKEN: process.env.E_MAIL_REFRESH_TOKEN,
    API_KEY: process.env.API_KEY || 'example',
    MONGODB_HOST: process.env.MONGODB_HOST || 'tubester-mongodb',
    MONGODB_PORT: Number(process.env.MONGODB_PORT) || 27017,
    MONGODB_DATABASE: process.env.MONNGODB_DATABASE || 'tubester',
    MONGODB_USER: process.env.MONGODB_USER || 'tubester',
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || 'exampleP4ssword',
}

export default config;