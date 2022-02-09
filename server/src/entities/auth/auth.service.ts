import {Injectable, NotFoundException} from '@nestjs/common';
import {UsersService} from '@entities/user/users.service';
import {JwtService} from '@nestjs/jwt';

import {UserInterface} from '@entities/user/interfaces/user.interface';
import {comparePassword} from '@common/utils/password.encrypt';
import {UsersResponseDto} from '@dtos/users';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(email: string, password: string): Promise<Omit<UserInterface, 'password'> | null | never> {
        const user = await this.usersService.getByEmail(email);

        if (!user) {
            throw new NotFoundException();
        }

        const isPasswordCorrect = await comparePassword(password, user.password);

        if (isPasswordCorrect) {
            const {password, ...result} = user;
            return result;
        }

        return null;
    }

    async login(user: UserInterface) {
        const payload = {email: user.email, sub: user.id};
        const token = this.jwtService.sign(payload);
        const profile = await this.usersService.update(user.id, {token});

        return {
            access_token: token,
            profile: new UsersResponseDto(profile)
        };
    }

    async logout(id: number) {
        return await this.usersService.update(id, {token: null});
    }
}
