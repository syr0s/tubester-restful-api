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
    // TODO implement POST to update the user
    // TODO implement PUT to create a new user
    // TODO implement DELETE to delete a user
}

export default EndpointUser;