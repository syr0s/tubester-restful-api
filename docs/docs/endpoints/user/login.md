# Endpoint `/user/login`
Login an existing user on the RESTful API. After the successfull validation of the credentials, the endpoint will issue a new [`json web token`](../../data/jwt.md) and
sends it to the requesting client. The [`json web token`](../../data/jwt.md) is required to access protected endpoints and is valid for `10` days after issuing. It is possible to re-new the [`json web token`](../../data/jwt.md) using the [`/user/renew`](renew.md) endpoint of the RESTful API.

## `GET`

### Authentication
The endpoint didn´t require any authentication and is public accessable.

### Header
The endpoint will ignore any header.

### Request: parameters
The endpoint will ignore any request parameter / query arguments.

### Request: body
The endpoint requires the following request body arguments:
- `email`: An e-mail address which is registered on the RESTful API
- `passwordHash`: A valid `sha-256` password hash related to the provided `email` address.

### Response

#### Invalid response
The endpoint will respond, based on the clients request.

- If one or more request body arguments are missing, the endpoint will respond with http status code `400 - Bad Request`.
- If the requested `email` is not found on the backends` database, the endpoint will respond with http status code `401 - Unauthorized`.
- If the user is marked as `active: false`, the endpoint will respond with http status code `400 - Bad Request`.
- If the user is markedd as `validated: false`, the endpoint will respond with http status code `400 - Bad Request`.
- If the `passwordHash` is not the same one as stored on the backends` database, the endpoint will respond iwth http status code `403 - Forbidden`.

#### Success response
The endpoint will respond, with http status code `200 - OK` on a successfull request and will deliver the [`json web token`](../../data/jwt.md) to the client as `Content-Type: application/json`.

##### Example response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoxNjQ3NzE4NDEyMDU3LCJ1dWlkIjoiNjIzNjJiNTllNmZiYjhiNjc1Mjg0ZmU4IiwidXNlckdyb3VwIjoxLCJpYXQiOjE2NDc3MTg0MTJ9.q35gNyNh7DjMJ-ksXFkowP7WtzcSxHIk8UL3MIzTTiQ",
    "uuid": "62386f133022923b01fdf4f9"
}
```

#### Response description
The response is a [`json web token`](../../data/jwt.md) which you want to use a `Bearer Token` in future requests to authenticate your users client against the database. The token is personalized, which means related to the user account which has requested the `/user/login` endpoint.

## Changelog
| Version | Changed by | Description |
|-------------|-------------|----|
| 1.0.0 | [Daniel Noetzel](mailto:daniel.noetzel@gmail.com) | Introduced endpoint |