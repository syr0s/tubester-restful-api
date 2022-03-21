import { Document, Schema, Model, model } from 'mongoose';

export interface UserInterface extends Document  {
    email: String;
    passwordHash: String;
    userGroup: Number;
    firstName?: String;
    lastName?: String;
    imageFile?: String;
    createdAt: Number;
    validatedAt?: Number;
    active: Boolean;
    validated: Boolean;
    confirmEndpoint?: String;
}

export const userSchema = new Schema({
    email: String,
    passwordHash: String,
    userGroup: Number,
    firstName: String,
    lastName: String,
    imageFile: String,
    createdAt: Number,
    validatedAt: Number,
    active: Boolean,
    validated: Boolean,
    confirmEndpoint: String,
});

export const User: Model<UserInterface> = model<UserInterface>('User', userSchema);