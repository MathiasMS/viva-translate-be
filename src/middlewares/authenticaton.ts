import { Handler } from 'express';
import { HTTP401Error, HTTP404Error } from '../utils/httpErrors';
import AuthenticationService from '../services/authentication/authentication.service';
import User, { IUser } from '../entities/User';

export const validate: Handler = async (req, res, next) => {
    try {
        const {
            headers: { authorization },
        } = req;

        if (!authorization) {
            throw new HTTP401Error('You do not have permission to use this app.');
        }

        const cleanToken = authorization.replace('Bearer ', '');

        const token: any = AuthenticationService.verifyToken(cleanToken);

        if (token && token.userId) {
            const { userId } = token;

            const user: IUser | null = await User.findById(userId);

            if (!user) {
                throw new HTTP404Error('User does not exist.');
            }

            req.userId = user._id;
            next();
        }
    } catch (e) {
        next(e);
    }
};
