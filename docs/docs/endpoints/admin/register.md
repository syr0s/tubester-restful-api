# Endpoint `/admin/register`
The endpoint `/admin/register` allows the administrator to register a new user account on the backend. Unlike the endpoint [`/user/register`](../user/register.md), the endpoint is not influenced on the environment variables `TWO_FACTOR_AUTH` and `REGISTRATION_ENABLED`. If no argument for `userGroup` is provided, the endpoint will generate the user as normal user (user group `0`). If the argument `active` is not provided, the endpoint will generate the user with `active: true`.

## `PUT`

### Authentication
The endpoint requires a valid Bearer authentication token / [`json web token`](../../data/jwt.md) to interact with the endpoint.

### Header
The endpoint will ignore any header.

### Request: parameters
The endpoint will ignore any request parameters arguments.

### Request: body
The endpoint takes required and optional arguments.

#### Required body arguments
- `email`: Change the e-mail address of the account.
- `passwordHash`: Change the password of the current account.

#### Optional body arguments
- `userGroup`: The RESTful API provides two basic user groups to sort user accounts.
- `firstName`: The first name of the user.
- `lastName`: The last name of the user.
- `active`: Sets the user account to active or not. Mostly, used to avoid access from a user, which is not active. By default, each user created is set to `active: true`.

### Response
#### Invalid response
- By using an invalid token, the endpoint will respond with http status code `401 - Unauthorized`.
- If the user has no admin privileges, the endpoint will respond with http status code `403 - Forbidden`.
- If the passed in e-mail address is already in the database, the endpoint will respond with http status code `400 - Bad Request`.

#### Success response
Will respond with http status code `201 - Created` on success.

#### Example response
```
No message response.
```

#### Response description
No message response.

## Changelog
| Version | Changed by | Description |
|-------------|-------------|----|
| 1.0.0 | [Daniel Noetzel](mailto:daniel.noetzel@gmail.com) | Introduced endpoint |