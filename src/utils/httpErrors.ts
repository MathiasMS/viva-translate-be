export abstract class HTTPClientError extends Error {
    public readonly statusCode!: number;
    public readonly name!: string;
    public translationOptions?: object | {};

    constructor(message: string | Array<string>, translationOptions?: object | {}) {
        if (Array.isArray(message)) {
            super(JSON.stringify(message));
        } else {
            super(JSON.stringify([message]));
        }
        this.name = this.constructor.name;
        this.translationOptions = translationOptions;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class HTTP400Error extends HTTPClientError {
    public readonly statusCode = 400;

    constructor(message: string | Array<string>, translationOptions?: object | {}) {
        super(message, translationOptions);
    }
}

export class HTTP404Error extends HTTPClientError {
    public readonly statusCode = 404;

    constructor(message: string | Array<string> = 'Not found', translationOptions?: object | {}) {
        super(message, translationOptions);
    }
}

export class HTTP401Error extends HTTPClientError {
    public readonly statusCode = 401;

    constructor(message: string | Array<string> = 'Access Denied', translationOptions?: object | {}) {
        super(message, translationOptions);
    }
}
