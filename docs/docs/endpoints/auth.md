# Endpoint `/v1/auth`
The auth endpoint of the Tubester RESTful API provides login capabilities. After the user logs in successfully the backend will generate a `json web token` and sends it to the client for further usage. The endpoint also provides the possiblity to re-new the `jwt` as it has an expiry of 10 days after creation.

## `GET`
The `GET` method of the endpoint `/v1/auth` is the main login endpoint. It is the only endpoint, a user is able to pass in its
credentials.

### Authentication
Not required - public accessable.

### Header
Accepts any headers, but will ignore them.

### Request: body
The endpoint requires the following request body parameters. If one or more parameter is missing, or didn´t contain data, the endpoint will respond with http status code `400 - Bad Request`.

- `username`: A valid username which is stored in the database. If an invalid username is provided, the endpoint will respond with `401 - Unauthicated`
- `passwordHash`: The password hash for the requested user account. If the passwordHash is invalid, the endpoint will respond with `403 - Forbidden`.

### Request: parameters
Accepts request parameters, but will ignore them.

### Response
- HTTP status code `200 - OK`
- Content-type `text`

**Example response**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoxNjQ3NzE4NDEyMDU3LCJ1dWlkIjoiNjIzNjJiNTllNmZiYjhiNjc1Mjg0ZmU4IiwidXNlckdyb3VwIjoxLCJpYXQiOjE2NDc3MTg0MTJ9.q35gNyNh7DjMJ-ksXFkowP7WtzcSxHIk8UL3MIzTTiQ
```

**Response description**

A `json web token` which is required to access other endpoints, which requires authentication.

## `POST`
The `POST` method of the endpoint `/v1/auth` provides the possiblity to re-new a `json web token`. This is needed, as a `jwt` will expire `10` days after it was signed by the server. You may want to call this endpoint during certain events in your application.

### Authentication
Requires a Bearer token header containing a valid `jwt`. Will respond with http status cod `401 - Unauthicated` on invalid
`json web token`.

### Header
Accepts any headers, but will ignore them.

### Request: body
Accepts request body, but will ignore them.

### Request: parameters
Accpets request parameters, but will ignore them

### Response
- HTTP status code `200 - OK`
- Content-type `text`

**Example response**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoxNjQ3NzE4NDEyMDU3LCJ1dWlkIjoiNjIzNjJiNTllNmZiYjhiNjc1Mjg0ZmU4IiwidXNlckdyb3VwIjoxLCJpYXQiOjE2NDc3MTg0MTJ9.q35gNyNh7DjMJ-ksXFkowP7WtzcSxHIk8UL3MIzTTiQ
```

**Response description**

A `json web token` which is required to access other endpoints, which requires authentication.

## `PUT`
Will respond with `405 - Method Not Allowed` as the method is not implemented for the endpoint.

## `DELETE`
Will respond with `405 - Method Not Allowed` as the method is not implemented for the endpoint.

## Changelog
| Version | Description |
|-------------|-------------|
| 1.0.0 | Introduced endpoint |