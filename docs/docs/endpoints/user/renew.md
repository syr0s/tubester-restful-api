# Endpoint `/user/renew`
Renew an existing [`json web token`](../../data/jwt.md). This will issue a new [`json web token`](../../data/jwt.md) to increase the expiry time. The old one, is still valid, until the expiry time (`10` days after issuing) has expired. This endpoint is typically called, to avoid re-logins required by the user.

If the client did not have a valid token, use the endpoint [`/user/login`](login.md) to authenticate the user first.

## `GET`

### Authentication
The endpoint requires a valid Bearer authentication token / [`json web token`](../../data/jwt.md) to interact with the endpoint.

### Header
The endpoint will ignore any header.

### Request: parameters
The endpoint will ignore any request parameter.

### Request: body
The endpoint will ignore any request body arguments.

### Response
#### Invalid response
By using an invalid token, the endpoint will respond with http status code `401 - Unauthorized`.

#### Success response
The endpoint will respond, with http status code `200 - OK` on a successfull request and will deliver the [`json web token`](../../data/jwt.md) to the client as `Content-Type: text/plain`.

#### Example response
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoxNjQ3NzE4NDEyMDU3LCJ1dWlkIjoiNjIzNjJiNTllNmZiYjhiNjc1Mjg0ZmU4IiwidXNlckdyb3VwIjoxLCJpYXQiOjE2NDc3MTg0MTJ9.q35gNyNh7DjMJ-ksXFkowP7WtzcSxHIk8UL3MIzTTiQ
```

#### Response description
The response is a [`json web token`](../../data/jwt.md) which you want to use a `Bearer Token` in future requests to authenticate your users client against the database. The token is personalized, which means related to the user account which has requested the `/user/login` endpoint.

## Changelog
| Version | Changed by | Description |
|-------------|-------------|----|
| 1.0.0 | [Daniel Noetzel](mailto:daniel.noetzel@gmail.com) | Introduced endpoint |