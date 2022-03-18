import Controller from '../interfaces/controller';
import { User, UserInterface } from '../models/user';

export class UserController extends Controller {
    /**
     * Collects all userdata from a particular username
     * @param username to query the database
     * @param projection filter to needed fields, you can activate certain fields using
     * @returns array containing the data or an empty if no data is available
     */
    public async readOne(username: string, projection?: object): Promise<any> {
        const user = await User.findOne({
            username: username
        },projection).lean().exec();
        return user;
    }

    /** 
     * Not implemented
     * @throws
     * */
    public readAll(): Promise<object[]> {
        throw new Error('readAll method not implemented for Users');
    }

    /**
     * Query the records using the `_id`.
     * @param id to query
     * @param projection filter to needed fields, you can activate certain fields using
     * @returns array containing the data or an empty if no data is available
     */
    public async readById(id: string, projection?: object): Promise<any> {
        const user = await User.findById(id, projection).exec();
        return user;
    }

    // TODO the parameter could be an object
    public async create(data: object): Promise<void> {
        const newUser: UserInterface = new User(data);
        await newUser.save();
    }

    // TODO implement method
    public update(key: string, data: object): Promise<void> {
        throw new Error('update method not implemented for Users');
    }

    // TODO implement method
    public del(key: string): Promise<void> {
        throw new Error('del method not implemented for Users');
    }
}