import config from "../config/main";
import { OS } from "./os";
import crypto, { KeyPairSyncResult } from 'crypto';
import logger from "../config/logger";
import { rootDir } from "../constants";

export class RSA extends OS {
    /** RSA options for key generation */
    private options:any = {
        modulusLength: 1024 * 2,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: config.JWT_SECRET_KEY,
        }
    };
    public privateKey?: string;
    public publicKey?: string;
    private privateKeyPath: string = `${rootDir}/.keys/private.pem`;
    private publicKeyPath: string = `${rootDir}/.keys/public.pem`;

    constructor() {
        super();
        if (!this.fileExists(this.privateKeyPath)) {
            logger.info('No private/public key found. Create new RSA key pair.')
            this.generateRSAkey();
        } else {
            this.readRSA();
        }
    }

    /** Read the RSA key pair from disk */
    private readRSA(): void {
        this.privateKey = this.readFile(this.privateKeyPath).toString();
        this.publicKey = this.readFile(this.publicKeyPath).toString();

    }

    /** Generate a new RSA key pair */
    private generateRSAkey():void {
        const keys: KeyPairSyncResult<string, string> = crypto.generateKeyPairSync('rsa', this.options);
        this.privateKey = keys.privateKey;
        this.publicKey = keys.publicKey;
        this.writeFile(this.privateKeyPath, this.privateKey);
        this.writeFile(this.publicKeyPath, this.publicKey);
        logger.info('Written new RSA key pair to disk');
    }
}