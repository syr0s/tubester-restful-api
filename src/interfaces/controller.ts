abstract class Controller {
    /**
     * Create a new record in the MongoDB
     * @param data object
     */
    public abstract create(data: object): Promise<void>;

    /**
     * Read a defined record from the MongoDB
     * @param needle search parameter as string
     + * @returns array containing result objects
     */
    public abstract readOne(needle: string): Promise<any>;

    /**
     * Read all records from the MongoDB
     * @returns array containing result objects
     */
    public abstract readAll(): Promise<object[]>;

    /**
     * Update a record in MongoDB
     * @param key string identifier
     * @param data object to update
     */
    public abstract update(key: string, data: object): Promise<void>;

    /**
     * Delete a record in MongoDB
     * @param key string identifier
     */
    public abstract del(key: string): Promise<void>;
}

export default Controller;