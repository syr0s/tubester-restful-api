# Endpoint `/user/delete`
The endpoint `/user/delete` provides the possiblity to delete the users own account on the backend. The user will be deleted without any further
warning.

## `DELETE`

### Authentication
The endpoint requires a valid Bearer authentication token / [`json web token`](../../data/jwt.md) to interact with the endpoint.

### Header
The endpoint will ignore any header.

### Request: parameters
The endpoint will ignore any request parameter arguments.

### Request: body
The endpoint will ignore any request body arguments.

### Response
#### Invalid response
The endpoint will respond, based on the clients request.

- By using an invalid token, the endpoint will respond with http status code `401 - Unauthorized`.

#### Success response
Response with `200 - OK` on successfull operation.

#### Example response
```
No response message
```

#### Response description
No response message.

## Changelog
| Version | Changed by | Description |
|-------------|-------------|----|
| 1.0.0 | [Daniel Noetzel](mailto:daniel.noetzel@gmail.com) | Introduced endpoint |