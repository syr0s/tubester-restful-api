/**
 * Configuration interface used for the main server configuration.
 */
interface Configuration {
    /** 
     * This is the name of the RESTful API server. The server name is typically used
     * inside any log files and will be returned by the root endpoint to your application.
     * If you want to make the application your own, you may want to change the value
     * accordingly. 
     * 
     * Default: `Tubester`
     * 
     * The value is set using the `.env` file.
     */
    SERVER_NAME: string;
    /**
     * This is the version the RESTful API currently running on. This value is used
     * to download the appropriate docker image. The value will be also returned
     * by the root endpoint of the server.
     * 
     * Default: `n.a.`
     * 
     * The value is set using the `.env` file.
     */
    SERVER_VERSION: string;
    /**
     * Defines the port the RESTful API is listening on. As the server is typically
     * running in a docker setup, there is normally no need to change this value.
     * If you want to change the server port, you may want to make this changes in
     * the `docker-compose.yml` file instead. If you change this value here, please
     * make sure to change the value in the `docker-compose.yml` file also, otherwise
     * the RESTful API becomes unreachable.
     * 
     * Default: `3000`
     * 
     * The value is set using the `.env` file.
     */
    SERVER_PORT: number;
    /**
     * Sets the RESTful API into debug mode. This will output more logs. This value
     * is typically set to true in development environments only.
     * 
     * Default: `false`
     * 
     * The value is set using the `.env` file.
     */
    DEBUG: boolean;
    /**
     * Activates / Deactives the log to file functionality of the server. Instead
     * of logging to the console and a dedicated log file, the server will only
     * log to the console, if set to `false`.
     * 
     * Default `true`
     * 
     * The value is set using the `.env` file.
     */
    LOG_TO_FILE: boolean;
    /**
     * Sets up the log level of the events.
     * - `info`: Will log a lot of informational stuff during the runtime.
     * - `warn`: Will log warnings, errors and fatal errors only. This will reduce
     * dramatically the messages in your log files.
     * - `error`: Only log errors and fatal errors.
     * - `fatal`: Only log fatal errors (not recommended).
     * 
     * Default: `info`
     * 
     * The value is set using the `.env` file.
     */
    LOG_LEVEL: string;
    /**
     * The path to store the log files. Please make sure that the node
     * user inside the container has read/write access to this path.
     * 
     * Default: logs
     * 
     * The value is set using the `config.ini` file.
     */
    LOG_PATH: string;
    /**
     * Name of the log file. Please make sure that the node user inside
     * the container has read/write access to this file.
     * 
     * Default: api.log
     * 
     * The value is set using the `config.ini` file.
     */
    LOG_FILE: string;
    /**
     * Secret key to encrypt / sign the json web token. Please make sure
     * that this variable contains a value, otherwise the server will 
     * throw an error.
     * 
     * Default: not set
     * 
     * The value is set using the `.env` file.
     */
    JWT_SECRET_KEY: string;

    /**
     * Enables or disables the feature to register new users on the backend.
     * 
     * Default: true
     * 
     * The value is set using the `.env` file.
     */
     REGISTRATION_ENABLED: boolean;

    /**
     * This variable activates or deactivates the two-factore authentication
     * using an email validation feature, on new registered accounts.
     * 
     * Default: true
     * 
     * The value is set using the `.env` file.
     */
     TWO_FACTOR_AUTH: boolean;

     /**
      * This variable contains the API key, which is used in various algorhytms to
      * encrypt/decrypt data or by the creation of hash values. It should be a
      * long and unqiue `string`.
      * 
      * Default: example
      * 
      * The value is set using the `.env` file.
      */
    API_KEY: string;

    /**
     * Hostname or IP address the MongoDB server is reachable.
     * 
     * Default: tubester-mongodb
     * 
     * The value is set using the `.env` file.
     */
    MONGODB_HOST: string;
    /**
     * The port the MongoDB server is listen on.
     * 
     * Default: 27017
     * 
     * The value is set using the `.env` file.
     */
    MONGODB_PORT: number;
    /**
     * Database name inside the MongoDB instance.
     * 
     * Default: tubester
     * 
     * The value is set using the `.env` file.
     */
    MONGODB_DATABASE: string;
    /**
     * User which has read and write access on the database.
     * 
     * Default: tubester
     * 
     * The value is set using the `.env` file.
     */
    MONGODB_USER: string;
    /**
     * Password of the database user.
     * 
     * Default: exampleP4ssword
     * 
     * The value is set using the `.env` file.
     */
    MONGODB_PASSWORD: string;

}

export default Configuration;