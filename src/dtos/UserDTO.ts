import { IsNotEmpty } from 'class-validator';

export class UserDTO {
    @IsNotEmpty()
    public username: string;

    @IsNotEmpty()
    public password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
