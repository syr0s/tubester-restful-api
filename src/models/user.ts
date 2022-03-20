import { Document, Schema, Model, model } from 'mongoose';

export interface UserInterface extends Document  {
    username: String;
    passwordHash: String;
    userGroup: Number;
    timestampCreation: Number;
    tmpAccount?: Boolean;
    tmpValidationEndpoint?: String;
}

export const userSchema = new Schema({
    username: String,
    passwordHash: String,
    userGroup: Number,
    timestampCreation: Number,
    tmpAccount: Boolean,
    tmpValidationEndpoint: String,
});

export const User: Model<UserInterface> = model<UserInterface>('User', userSchema);