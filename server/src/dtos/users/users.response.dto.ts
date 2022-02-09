import {UserRoleEnum} from '@enums/users/roles';

import {UserInterface} from '@entities/user/interfaces/user.interface';
import {Post} from '@entities/post/post.entity';

export class UsersResponseDto {
    readonly id: number;
    readonly role: UserRoleEnum;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly createdAt: Date;

    constructor(user?: UserInterface) {
        if (user) {
            this.id = user.id;
            this.role = user.role;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.email = user.email;
            this.createdAt = user.createdAt;
        }
    }
}
