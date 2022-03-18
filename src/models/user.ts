import { Document, Schema, Model, model, Error } from 'mongoose';

export interface UserInterface extends Document  {
    // TODO how to autoincrement the userId?
    userId: String;
    username: String;
    passwordHash: String;
}

export const userSchema = new Schema({
    // TODO how to autoincrement the userId?
    userId: String,
    username: String,
    passwordHash: String,
});

export const User: Model<UserInterface> = model<UserInterface>('User', userSchema);