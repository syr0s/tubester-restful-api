import { Document, Schema, Model, model } from 'mongoose';

export interface UserInterface extends Document  {
    email: string;
    passwordHash: string;
    userGroup: number;
    firstName?: string;
    lastName?: string;
    imageFile?: string;
    createdAt: number;
    validatedAt?: number;
    active: boolean;
    validated: boolean;
    confirmEndpoint?: string;
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