import log4js from 'log4js';
import config from './main';

const appenders:string[] = ['console'];
console.log(config.LOG_TO_FILE)
if (config.LOG_TO_FILE) {
    appenders.push('file');
} 
log4js.configure({
    appenders: { 
        file: { 
            type: "file",
            // TODO this value should come from `config.ini`
            filename: "logs/api.log"
        }, 
        console: {
            type: "stdout",
        }
    },
    categories: { 
        default: {
            appenders: appenders,
            level: config.LOG_LEVEL
        } 
    }
});

/**
 * This is the logger for the RESTful API. It provides all basic
 * logging capabilities. The logger will write all events to the
 * console as well as to a dedicated log file `./logs/api.log`,
 * if the value of `LOG_TO_FILE` is set to `true`.
 * The log level can be set, using the `.env` file, `LOG_LEVEL`,
 * by default the value is set to `info`.
 * On servers which are in `DEBUG` mode, the log level will
 * be overwritten with `debug` to get all messages from the 
 * RESTful API.
 */
const logger = log4js.getLogger(`${config.SERVER_NAME.toUpperCase()}-API`);

logger.level = config.LOG_LEVEL;
// Activate debug log level only if API is running in debug mode
if (config.DEBUG) {
    logger.level = 'debug';
}

export default logger;