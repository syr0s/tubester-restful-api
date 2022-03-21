# Configuration
The configuration of the Tubester RESTful API is splitted into two different parts. The most settings, you want to change to your needs, are passed using environment variables or a dedicated `.env` file combined with `docker-compose`. Besides this configuration, you will find the `config.ini` file inside the docker image `/usr/app/config/config.ini`. This file contains, more hard coded configuration settings, which you may want to remain to its default.

## Environment variables
The recommended way to set up your environment variables, using `docker-compose` is to put them inside a dedicated `.env` file. Therefore, this repository, contains an example `.env` file. The environment variables can be ordered in different sections, which this document will follow.

### General server settings
The general server settings will setup the most basic configuration of your RESTful API. 

#### `SERVER_NAME`
This is the name of the RESTful API server. The server name is typically used inside any log files and will be returned by the root endpoint to your application. If you want to make the application your own, you may want to change the value accordingly.

***Default:*** `Tubester`

#### `SERVER_VERSION`
This is the version the RESTful API currently running on. This value is used to download the appropriate docker image, while following our `docker-compose` setup. The value will be also returned by the root endpoint of the server.

***Default:*** `1.0.0`

#### `SERVER_PORT`
Defines the port the RESTful API is listening on. As the server is typically running in a docker setup, there is normally no need to change this value. If you want to change the server port, you may want to make this changes in the `docker-compose.yml` file instead. If you change this value here, please make sure to change the value in the `docker-compose.yml` file also, otherwise the RESTful API becomes unreachable.

***Default:*** `3000`

#### `DEBUG`
Sets the RESTful API into debug mode. This will output more logs. This value is typically set to true in development environments only and should be set to `false` on any production servers.

***Default:*** `false`

### Logging settings
The logging settings will control the default logging behavior of your Tubester RESTful API.

#### `LOG_TO_FILE`
Activates / Deactives the log to file functionality of the server. Instead of logging to the console and a dedicated log file, the server will only log to the console, if set to `false`.

***Default:*** `true`

#### `LOG_LEVEL`
Sets up the log level of the events.

- `info`: Will log a lot of informational stuff during the runtime.
- `warn`: Will log warnings, errors and fatal errors only. This will reduce dramatically the messages in your log files.
- `error`: Only log errors and fatal errors.
- `fatal`: Only log fatal errors (not recommended).

***Default:*** `info`

### Security settings
This sections sets up the security settings of the Tubester RESTful API. Your server instance will report a warning, if you use the default values of the configuration, as they would cause security issues.

#### `JWT_SECRET_KEY`
Secret key to sign the json web token. Please make sure that this variable contains a value, otherwise the server will throw an error.

***Default:*** `<empty string>`

#### `API_KEY`
This variable contains the API key, which is used in various algorhytms to encrypt/decrypt data or by the creation of hash values. It should be a long and unqiue `string`.

***Default:*** `example`