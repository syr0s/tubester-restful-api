import { Document, Schema, Model, model } from 'mongoose';

export interface UserInterface extends Document  {
    username: String;
    passwordHash: String;
    userGroup: Number;
}

export const userSchema = new Schema({
    username: String,
    passwordHash: String,
    userGroup: Number,
});

export const User: Model<UserInterface> = model<UserInterface>('User', userSchema);