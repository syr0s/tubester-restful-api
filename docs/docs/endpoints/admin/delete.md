# Endpoint `/admin/delete`
Deletes a given user account from the backend, if present.

## `DELETE`

### Authentication
The endpoint requires a valid Bearer authentication token / [`json web token`](../../data/jwt.md) to interact with the endpoint.

### Header
The endpoint will ignore any header.

### Request: parameters
Takes the `uuid` as required parameter argument.

### Request: body
The endpoint will ignore any request body arguments.

### Response
#### Invalid response
- By using an invalid token, the endpoint will respond with http status code `401 - Unauthorized`.
- If the user has no admin privileges, the endpoint will respond with http status code `403 - Forbidden`.
- If no `uuid` parameter is passed in, the endpoint will respond with http status code `400 - Bad Request`.
- If the passed in uuid is not in the database, the endpoint will respond with http status code `400 - Bad Request`.

#### Success response
Will return http status `200 - OK` on success.

#### Example response
```
No message response
```

#### Response description
No message response.

## Changelog
| Version | Changed by | Description |
|-------------|-------------|----|
| 1.0.0 | [Daniel Noetzel](mailto:daniel.noetzel@gmail.com) | Introduced endpoint |