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
    public del(key: string): Promise<void> {
        throw new FatalError('Method del() not implemented for ConfigController');
    }

    /** Method not implemented */
    public readOne(needle: string, projection?: object): Promise<any> {
        throw new FatalError('Method readOne() not implemented for ConfigController');
    }

    /** Method not implemented */
    public readById(id: string, projection?: object): Promise<any> {
        throw new FatalError('Method readById() not implemented for ConfigController');
    }

    /** Method not implemented */
    public readConfirm(id: string): Promise<any> {
        throw new FatalError('Method readConfirm() not implemented for ConfigController');
    }

    /** Method not implemented */
    public update(key: string, data: object): Promise<void> {
        throw new FatalError('Method update() not implemented for ConfigController');
    }
}