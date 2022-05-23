import User, { IUser } from '../../entities/User';
import { UserDTO } from '../../dtos/UserDTO';
import { generateHash, generateSalt } from '../../utils/cryptography';

interface IUserService {
    signUpUser(userSignUpDto: UserDTO): Promise<IUser>;
    getByUserName(username: string): Promise<IUser | null>;
}

const UserService: IUserService = {
    async signUpUser(userSignUpDto: UserDTO): Promise<IUser> {
        const { password, username } = userSignUpDto;

        const salt: string = await generateSalt();
        const hashedPassword: string = await generateHash(password, salt);

        return await User.create({
            username,
            salt,
            password: hashedPassword,
        });
    },
    async getByUserName(username: string): Promise<IUser | null> {
        return await User.findOne({ username });
    },
};

export default UserService;
