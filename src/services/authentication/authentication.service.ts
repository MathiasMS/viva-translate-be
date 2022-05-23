import { JsonWebTokenError, JwtPayload, sign, TokenExpiredError, verify, VerifyErrors } from 'jsonwebtoken';
import { VIVA_AUTH_SECRET } from '../../config/config';
import { HTTP401Error } from '../../utils/httpErrors';

export interface IAuthenticationService {
    signToken(userId: string, expiresIn: string): string;
    verifyToken(token: string): string | JwtPayload | undefined;
}

const AuthenticationService: IAuthenticationService = {
    signToken(userId: string, expiresIn: string): string {
        try {
            const payload: JwtPayload = {
                userId,
            };

            const jwtoken: string = sign(payload, VIVA_AUTH_SECRET, {
                expiresIn,
            });

            return jwtoken;
        } catch (error) {
            throw error;
        }
    },
    verifyToken(token: string): string | JwtPayload | undefined {
        try {
            return verify(token, VIVA_AUTH_SECRET);
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                throw new HTTP401Error('Not valid token.');
            } else if (error instanceof TokenExpiredError) {
                throw new HTTP401Error('Token expired.');
            } else {
                throw error;
            }
        }
    },
};

export default AuthenticationService;
