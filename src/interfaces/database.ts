abstract class Database {
    protected host: string;
    protected port: number;
    protected database: string;
    protected user: string;
    protected password: string;

    /**
     * Creates a new `Database` instance.
     * @param host Hostname or IP address of the database.
     * @param port Port the database server is listen on.
     * @param database Name of the database.
     * @param user Username with read-write permisions on the database.
     * @param password Password of the database user.
     */
    constructor(
        host: string,
        port: number,
        database: string,
        user: string,
        password: string
    ) {
        this.host = host;
        this.port = port;
        this.database = database;
        this.user = user;
        this.password = password;
    }

    /**
     * Establish a connection to the database server.
     * @protected
     * @abstract
     */
    protected abstract connect(): void;

    /**
     * Close or release a connection to the database server.
     * @protected
     * @abstract
     */
    protected abstract close(): void;

    /** 
     * Read records from the database.
     * @public
     * @abstract
     * @returns Array of objects containing the query result
     */
    public abstract read(): object[];
    
    /** 
     * Write record(s) to the database.
     * @public
     * @abstract
     * @returns status code as `number`
     */
    public abstract write(): number;
    
    /** 
     * Delete a record from the database.
     * @public
     * @abstract
     * @returns status code as `number`
     */
    public abstract del(): number;
}

export default Database;