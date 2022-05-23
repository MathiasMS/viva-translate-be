import { Response, Request, NextFunction } from 'express';
import { HTTP400Error, HTTP401Error } from '../../utils/httpErrors';
import { UserDTO } from '../../dtos/UserDTO';
import UserService from '../../services/users/user.service';
import { validate } from '../../utils/cryptography';
import AuthenticationService from '../../services/authentication/authentication.service';
import { VIVA_AUTH_TOKEN_EXPIRATION_TIME } from '../../config/config';

//Authentication Manipulation
export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userSignUpDto: UserDTO = req.body;
        const { username } = userSignUpDto;

        const existingUser = await UserService.getByUserName(username);

        if (existingUser) {
            throw new HTTP400Error('A user with that username already exists.');
        }

        const newUser = await UserService.signUpUser(userSignUpDto);

        return res.send(newUser);
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userSignUpDto: UserDTO = req.body;

        const { username, password } = userSignUpDto;

        const existingUser = await UserService.getByUserName(username);

        if (!existingUser) {
            throw new HTTP400Error('Login failed. Please check your username and password.');
        }

        const isCorrect = await validate(password, existingUser.password, existingUser.salt);

        if (!isCorrect) {
            throw new HTTP401Error('Login failed. Please check your username and password.');
        }

        const { _id } = existingUser;

        const token = await AuthenticationService.signToken(_id, VIVA_AUTH_TOKEN_EXPIRATION_TIME);

        return res.send({ token, user: existingUser });
    } catch (error) {
        next(error);
    }
};
