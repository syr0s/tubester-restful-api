import { Request, Response } from "express";
import Authentication from "../../interfaces/authentication";

export class EndpointUserConfirm extends Authentication {
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    protected get(): void {
        if (this.request.query.id) {
            this.userController.readConfirm(String(this.request.query.id)).then((result) => {
                if (result) {
                    this.userController.update(result._id, {
                        validated: true,
                        validatedAt: Date.now(),
                    });
                    this.status(200);
                    this.response.send();
                } else {
                    this.status(404);
                    return;
                }
            });
        } else {
            this.status(400);
        }
    }
}