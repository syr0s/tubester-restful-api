# Json web token
The `json web token` or short `jwt` is a server-side signed token, which allows the client to access certain endpoints on the RESTful API, without further authentication. In fact, all required authentication is stored within the `jwt`. The payload of `jwt` is secured using a unique `JWT_SECRET_KEY`, you will create on the backend. Please make sure to secure the `JWT_SECRET_KEY`, as everybody having this value is able to decrypt your `jwt`. Therefore, do not use version control on your `.env` file.

## Properties

### `time`
The `time` property of the `jwt` contains the unix timestamp of the moment the `jwt` was issued by the server. It is used to validate that the `json web token` has not expired yet. The expiry time of a `jwt` on the RESTful API is `10` days after signing.

### `uuid`
The `uuid` property contains the unique user identifier, which is equal to the document `_id` stored in the MongoDB. The backend will perform the most of its task using the value of this property.

### `userGroup`
The `userGroup` property contains a integer value of the user group the particular user is related to. The RESTful API currently supports two different user groups:
- `0`: Normal user, without any admin privileges.
- `1`: Admin users, which are allowed to access admin endpoints on the RESTful API.

## Changelog
| Version | Changed by | Description |
|-------------|-------------|----|
| 1.0.0 | [Daniel Noetzel](mailto:daniel.noetzel@gmail.com) | Introduced endpoint |