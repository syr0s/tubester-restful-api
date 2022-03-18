import Authentication from "../interfaces/authentication";

class EndpointUser extends Authentication {
    /**
     * `GET` method for the endpoint `/v1/user`. Provides all user
     * information for the loged in user account.
     */
    protected get(): void {
        if(this.validateJWT()) {
            // deactivate all system fields and the passwordHash field
            const projection = {
                _id: 0,
                passwordHash: 0,
                __v: 0
            }
            this.userController.readById(String(this.uuid), projection).then((result) => {
                this.status(200);
                this.response.send(result);
            })
        }
    }
    /**
     * `POST` method for the endpoint `/v1/user`. Updates the current user to the
     * new data received within the `request.body`.
     */
    protected post(): void {
        if (this.validateJWT()) {
            this.validatePayload();
            // Check if the requested new username is already in the database
            this.userController.readOne(this.request.body.username).then((result) => {
                if (!result) {
                    const data = {
                        username: this.request.body.username,
                        passwordHash: this.request.body.passwordHash,
                    }
                    this.userController.update(String(this.uuid), data)
                    this.status(201);
                    this.response.end();
                } else {
                    this.status(400);
                }
            });
        }
    }
    
    /**
     * Create a new user on the database.
     * Requires a `username` and `passwordHash` inside the body
     * request, will otherwise return `400 - Bad Request`. Will
     * provide a lookup in the database, if the given username
     * exists, if the username was found the API returns `400 -
     * Bad Request`. After the user was created the API will
     * return `201 - Created` to the client.
     */
    protected put(): void {
        if (this.validateJWT()) {
            this.validatePayload();
            this.userController.readOne(this.request.body.username).then((result) => {
                if (!result) {
                    const data: object = {
                        username: this.request.body.username,
                        passwordHash: this.request.body.passwordHash,
                    };
                    this.userController.create(data);
                    this.status(201);
                    this.response.end();
                } else {
                    this.status(400);
                }
            });
        }
    }
    // TODO implement DELETE to delete a user
}

export default EndpointUser;