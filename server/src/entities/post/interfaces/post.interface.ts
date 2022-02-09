import {UserInterface} from '@entities/user/interfaces/user.interface';

export interface PostInterface {
    id: number;
    title: string;
    content: string;
    user: UserInterface;
    updatedAt: Date;
    createdAt: Date;
}

export interface PostInputInterface {
    title: string;
    content: string;
}
