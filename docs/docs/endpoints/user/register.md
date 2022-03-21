# Endpoint `/user/register`
The endpoint `/user/register` is used to register a new user account on the backend. The feature can be switched off, by setting the environment variable `REGISTRATION_ENABLED: false`. It is possible to activate a two factor authentication, which requires the user to confirm the account creation, by receiving a link on the passed in e-mail address. This feature can be deactivated, by setting the environment variable `TWO_FACTOR_AUTH: false`. The feature requires a propper e-mail setup, otherwise the server will not start. The newly generated user account can be confirmed, by a `GET` request on the endpoint [/user/confirm](confirm.md).

## `PUT`

### Authentication
The endpoint didn´t require any authentication and is public accessable.

### Header
The endpoint will ignore any header.

### Request: parameters
The endpoint will ignore any request parameter / query arguments.

### Request: body
The endpoint has required and optional body arguments, which can be passed in.

#### Required body arguments
- `email`: The e-mail address of the registered user account. The e-mail property is unique, which means, that the API will not allow the same value on different user accounts.
- `passwordHash`: A `sha-256` hash value from the users password. The RESTful API never requests plain text passwords from the user and will not store them in plain text.

#### Optional body arguments
- `firstName`: The first name of the user.
- `lastName`: The last name of the user.

### Response
#### Invalid response
The endpoint will respond, based on the clients request.

- If one or more request body arguments are missing, the endpoint will respond with http status code `400 - Bad Request`.
- By using an existing e-mail address, th eendpoint will respond with http status code `400 - Bad Request`.
- If the user registration feature is disabled, by setting the environment variable `REGISTRATION_ENABLED: false`, the endpoint will respond with http status code `405 - Method Not allowed`.

#### Success response
The endpoint will return with http status code `201 - Created` on successfull operation.

#### Example response
```
No response message.
```

#### Response description
No response message.

## Changelog
| Version | Changed by | Description |
|-------------|-------------|----|
| 1.0.0 | [Daniel Noetzel](mailto:daniel.noetzel@gmail.com) | Introduced endpoint |