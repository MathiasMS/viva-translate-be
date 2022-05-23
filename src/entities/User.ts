import { Schema, model, Document } from 'mongoose';

export type UserId = string;
export type UserUsername = string;
export type UserPassword = string;
export type UserSalt = string;

export interface IUser extends Document {
    _id: UserId;
    username: UserUsername;
    password: UserPassword;
    salt: UserSalt;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Username is required.'],
        },
        salt: {
            type: String,
            required: [true, 'You need to generate a salt to your password.'],
        },
        password: {
            type: String,
            required: [true, 'Password is required.'],
        },
    },
    {
        collection: 'users',
        timestamps: true,
        versionKey: false,
    }
);

export default model<IUser>('Users', UserSchema);
