import Controller from "../interfaces/controller";
import { ConfigInterface, BaseConfig } from "../models/config";
import FatalError from "../utils/error_handler";

export class ConfigController extends Controller {
    /**
     * 
     * @param data 
     */
    public async create(data: object): Promise<void> {
        const newConfig: ConfigInterface = new BaseConfig(data);
        await newConfig.save();
    }

    /**
     * 
     * @param projection 
     */
    public async readAll(projection?: object): Promise<object[]> {
        const data = await BaseConfig.find({}, projection).lean().exec();
        return data;
    }

    /** Method not implemented */
    public del(): Promise<void> {
        throw new FatalError('Method del() not implemented for ConfigController');
    }

    /** Method not implemented */
    public readOne(): Promise<void> {
        throw new FatalError('Method readOne() not implemented for ConfigController');
    }

    /** Method not implemented */
    public readById(): Promise<void> {
        throw new FatalError('Method readById() not implemented for ConfigController');
    }

    /** Method not implemented */
    public readConfirm(): Promise<void> {
        throw new FatalError('Method readConfirm() not implemented for ConfigController');
    }

    /** Method not implemented */
    public update(): Promise<void> {
        throw new FatalError('Method update() not implemented for ConfigController');
    }
}