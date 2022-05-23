import * as crypto from 'crypto';
import base64url from 'base64url';

const LENGTH = 64;

function cleanup(buffer: Buffer) {
    const cleaned = buffer
        .toString('base64') // convert to base64 format
        .substr(0, LENGTH) // return required number of characters
        .replace(/\+/g, '_') // replace '+' with '_'
        .replace(/\//g, '|'); // replace '/' with '-');

    return cleaned;
}

export function generateSalt(): Promise<string> {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(Math.ceil((LENGTH * 3) / 4), (err, buffer) => {
            if (err) {
                return reject(err);
            }

            return resolve(cleanup(buffer).toString());
        });
    });
}

export function generateHash(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 10000, LENGTH, 'sha512', (err, buffer) => {
            if (err) {
                return reject(err);
            }

            return resolve(cleanup(buffer).toString());
        });
    });
}

export async function validate(password: string, _hash: string, salt: string) {
    const newHash = await generateHash(password, salt);
    return newHash === _hash;
}
