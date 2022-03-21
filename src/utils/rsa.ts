import config from "../config/main";
import { OS } from "./os";
import crypto, { KeyPairSyncResult } from 'crypto';
import logger from "../config/logger";

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
    private privateKey?: string;
    private publicKey?: string;
    private privateKeyPath: string = `${__dirname}/private.pem`;
    private publicKeyPath: string = `${__dirname}/public.pem`;

    constructor() {
        super();
        console.log(this.fileExists(this.privateKeyPath))
        if (!this.fileExists(this.privateKeyPath)) {
            logger.info('No private/public key found. Create new RSA key pair.')
            this.generateRSAkey();
        }
    }

    private generateRSAkey() {
        const keys: KeyPairSyncResult<string, string> = crypto.generateKeyPairSync('rsa', this.options);
        this.privateKey = keys.privateKey;
        this.publicKey = keys.publicKey;
        this.writeFile(this.privateKeyPath, this.privateKey);
        this.writeFile(this.publicKeyPath, this.publicKey);
        logger.info('Written new RSA key pair to disk');
    }
}