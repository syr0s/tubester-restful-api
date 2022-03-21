# UserInterface
The `UserInterface` defines the properties an user may have on the backend. It is mostly used to interact with MongoDB, as well as delivering server side response to the requesting client. This document should provide you an overview about the interface, to give you ideas to interact with.

## Properties

### `email`
The e-mail address of the registered user account. The e-mail property is unique, which means, that the API will not allow the same value on different user accounts.

### `passwordHash`
A `sha-256` hash value from the users password. The RESTful API never requests plain text passwords from the user and will not store them in plain text.

### `userGroup`
The RESTful API provides two basic user groups to sort user accounts.

- `0`: Normal users, without any administrational privilieges.
- `1`: Administrator users, which can access admin endpoints as well.

### `firstName`
Optional. The first name of the user.

### `lastName`
Optional. The last name of the user.

### `imageFile`
Optional. Path and file name to the related user image.

### `createdAt`
Timestamp of the users creation.

### `validatedAt`
Optional. The timestamp when the user was validated by requesting the `/user/confirm` endpoint. This property will be only set if the RESTful API is setup to use two factor authentication. This is done setting the environment variable `TWO_FACTOR_AUTH` to `true` and requires an e-mail setup as well.

### `active`
Sets the user account to active or not. ***Currently, no functions implemented***

### `validated`
Indicates if the user account was validated by requesing the endpoin `/user/confirm`.

## Changelog
| Version | Changed by | Description |
|-------------|-------------|----|
| 1.0.0 | [Daniel Noetzel](mailto:daniel.noetzel@gmail.com) | Introduced endpoint |