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
            email: username
        },projection).lean().exec();
        return user;
    }

    /** 
     * Not implemented
     * @throws
     * */
    public async readAll(projection?: object): Promise<object[]> {
        const userData = await User.find({}, projection).lean().exec();
        return userData;
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

    /**
     * Update a record in MongoDB
     * @param key the `_id`
     * @param data to update
     */
    public async update(key: string, data: object): Promise<void> {
        await User.findByIdAndUpdate(key, data).exec();
    }

    /**
     * Delete a record in MongoDB
     * @param key the `_id` of the record
     */
    public async del(key: string): Promise<void> {
        await User.findByIdAndDelete(key).exec();
    }
}