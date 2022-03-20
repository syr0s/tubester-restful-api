import logger from "../config/logger";

class FatalError {
    private msg: string;
    /** Terminate the server logging a fatal event */
    constructor(msg: string) {
        this.msg = msg;
        this.log();
        process.exit(1);
    }

    /** Log a `fatal` event */
    private log(): void {
        logger.fatal(this.msg);
    }
}

export default FatalError;