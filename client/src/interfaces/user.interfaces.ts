import {PostInterface} from './post.interface';

export enum UserRoleEnum {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface UserInterface {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    token: string;
    email: string;
    role: UserRoleEnum;
    posts: PostInterface[];
    updatedAt: Date;
    createdAt: Date;
}

export interface UserInputInterface {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}
