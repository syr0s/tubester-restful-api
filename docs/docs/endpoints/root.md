# Endpoint `/v1/`
The root endpoint of the Tubester RESTful API provides you some basic server informations,
which you may want to use within your application. The endpoint is public accessable, no
authentication required.

## `GET`
The `GET` method of the endpoint `/v1/` is the only available one and will respond with some
basic server information.

### Authentication
Not required - public accessable.

### Header
Accepts any headers, but will ignore them.

### Request: body
Accepts request body, but will ignore them.

### Request: parameters
Accepts request parameters, but will ignore them.

### Response
- HTTP status code: `200 - OK`
- Content-type: `application/json`

**Example response**
```json
{
    "name": "Tubester",
    "version": "1.0.0",
    "debug": true
}
```

**Response description**

- `name`: The name of the RESTful API. You may want to use this value as the title of your client application. The name can
be set, using the environment variable `SERVER_NAME`.
- `version`: The version the RESTful API is running on. This value can be useful, to implement new methods within the client
application which targeting minimum server versions.
- `debug`: Indicates that the server runs in debug mode or not. In debug mode, the server has a high verbosity on creating logs. This
value could be useful to automatically set your client application into debug mode also, if the server runs in debug mode.

## `POST`
Will respond with `405 - Method Not Allowed` as the method is not implemented for the endpoint.

## `PUT`
Will respond with `405 - Method Not Allowed` as the method is not implemented for the endpoint.

## `DELETE`
Will respond with `405 - Method Not Allowed` as the method is not implemented for the endpoint.

## Changelog
| Version | Description |
|-------------|-------------|
| 1.0.0 | Introduced endpoint |