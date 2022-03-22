import { Document, Schema, Model, model } from 'mongoose';

export interface ConfigInterface extends Document  {
    JWT_SECRET_KEY: String;
}

export const configSchema = new Schema({
    JWT_SECRET_KEY: String,
});

export const BaseConfig: Model<ConfigInterface> = model<ConfigInterface>('BaseConfig', configSchema);