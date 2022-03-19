abstract class Controller {
    /**
     * Create a new record in the MongoDB
     * @param data object
     */
    public abstract create(data: object): Promise<void>;

    /**
     * Read a defined record from the MongoDB
     * @param needle search parameter as string
     * @param projection filter to needed fields, you can activate certain fields using
     * key value pair: fieldname: 1 or deactivate them using fieldname: 0
     * @returns array containing result objects
     */
    public abstract readOne(needle: string, projection?: object): Promise<any>;

    /**
     * Read all records from the MongoDB
     * @returns array containing result objects
     */
    public abstract readAll(projection?: object): Promise<object[]>;

    /**
     * Query for a specific record id.
     * @param id of the record
     */
    public abstract readById(id: string, projection?: object): Promise<any>;

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