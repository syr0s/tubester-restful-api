import Controller from '../interfaces/controller';
import { User, UserInterface } from '../models/user';

export class UserController extends Controller {
    /**
     * Collects all userdata from a particular username
     * @param username to query the database
     * @returns array containing the data or an empty if no data is available
     */
    public async readOne(username: string): Promise<any> {
        const user = await User.findOne({
            username: username
        }).lean().exec();
        return user;
    }

    /** 
     * Not implemented
     * @throws
     * */
    public readAll(): Promise<object[]> {
        throw new Error('readAll method not implemented for Users');
    }

    // TODO the parameter could be an object
    public async create(data: object): Promise<void> {
        const newUser: UserInterface = new User(data);
        await newUser.save();
        console.log(newUser);
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