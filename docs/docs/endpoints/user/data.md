# Endpoint `/user/data`
The endpoint `/user/data` provides two different functionalities. The `GET` method provides the posibility to request basic user information, excluded all confidential ones, for a certain user account. The `POST` method will update the loged in user account with the provided values.

## `GET`
The `GET` method of the endpoint returns basic user information for a requested account.

### Authentication
The endpoint requires a valid Bearer authentication token / [`json web token`](../../data/jwt.md) to interact with the endpoint.

### Header
The endpoint will ignore any header.

### Request: parameters
The method takes the required request parameter `uuid`.

### Request: body
The endpoint will ignore any request body arguments.

### Response
#### Invalid response
The endpoint will respond, based on the clients request.

- By using an invalid token, the endpoint will respond with http status code `401 - Unauthorized`.
- If the request parameter is missing, the endpoint will respond with http status code `400 - Bad Request`.
- If the user is marked as `active: false`, the endpoint will respond with http status code `400 - Bad Request`.
- If the user is markedd as `validated: false`, the endpoint will respond with http status code `400 - Bad Request`. 
- If the `uuid` is not found in the database, the endpoint wil respond with http status code `404 - Not Found`.

#### Success response
The endpoint will respond with http status code `200 - OK` on a successfull request, returning `content-type: application/json` with the following payload.

#### Example response
```json
{
    "email": "someone@somewhere.com",
    "uuid": "123456abc"
}
```

#### Response description
- `email`: The e-mail address of the user account.
- `uuid`: The unique user identifier of the user account.

## `POST`
The `POST` method of the endpoint will update the current account, by using the `uuid` stored in the [`json web token`](../../data/jwt.md).

### Authentication
The endpoint requires a valid Bearer authentication token / [`json web token`](../../data/jwt.md) to interact with the endpoint.

### Header
The endpoint will ignore any header.

### Request: parameters
The endpoint will ignore any request parameter / query arguments.

### Request: body
The endpoint will accept the following request body items. All other body arguments will be ignored by the API. The endpoint requires at least one valid argument.

- `email`: Change the e-mail address of the account.
- `passwordHash`: Change the password of the current account.

### Response
#### Invalid response
The endpoint will respond, based on the clients request.
- By using an invalid token, the endpoint will respond with http status code `401 - Unauthorized`.
- By using an existing e-mail address, th eendpoint will respond with http status code `400 - Bad Request`.

#### Success response
Returns http status code `200 - OK` if operation was successfull.

#### Example response
```
No response.
```

#### Response description
Method did not respond with any message.

## Changelog
| Version | Changed by | Description |
|-------------|-------------|----|
| 1.0.0 | [Daniel Noetzel](mailto:daniel.noetzel@gmail.com) | Introduced endpoint |