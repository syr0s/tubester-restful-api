import { Document, Schema, Model, model } from 'mongoose';

export interface UserInterface extends Document  {
    email: String;
    passwordHash: String;
    userGroup: Number;
    timestampCreation: Number;
    tmpAccount?: Boolean;
    tmpValidationEndpoint?: String;
}

export const userSchema = new Schema({
    email: String,
    passwordHash: String,
    userGroup: Number,
    timestampCreation: Number,
    tmpAccount: Boolean,
    tmpValidationEndpoint: String,
});

export const User: Model<UserInterface> = model<UserInterface>('User', userSchema);