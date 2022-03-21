# Endpoint `/admin/data`
Returns all users registered on the backend. Requires admin privileges.

## `GET`

### Authentication
The endpoint requires a valid Bearer authentication token / [`json web token`](../../data/jwt.md) to interact with the endpoint.

### Header
The endpoint will ignore any header.

### Request: parameters
The endpoint will ignore any request parameters arguments.

### Request: body
The endpoint will ignore any request body arguments.

### Response
#### Invalid response
- By using an invalid token, the endpoint will respond with http status code `401 - Unauthorized`.
- If user has no admin privileges, the endpoint will respond with http status code `403 - Forbidden`.

#### Success response
Will return with http status code `200 - OK` and `content-type: application/json` on a successfull request.

#### Example response
```json
[
    {
        "_id": "62387fd63161839b4ead65d3",
        "email": "admin@example.com",
        "userGroup": 1,
        "createdAt": 1647869910900,
        "active": true,
        "validated": true
    },
    {
        "_id": "62387ff53161839b4ead65d8",
        "email": "daniel@example.com",
        "userGroup": 0,
        "firstName": "Daniel",
        "lastName": "",
        "createdAt": 1647869941598,
        "active": true,
        "validated": false,
        "confirmEndpoint": "ecb0379e2fddb31ba7f2077a72b91dfb6a95fc193ba48dc1f54694c362eb2657"
    }
]
```

See [UserInterface](../../data/user_interface.md) for further information about the response payload.

## Changelog
| Version | Changed by | Description |
|-------------|-------------|----|
| 1.0.0 | [Daniel Noetzel](mailto:daniel.noetzel@gmail.com) | Introduced endpoint |