import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRoleEnum} from '@enums/users/roles';
import {UserInputInterface, UserInterface} from './interfaces/user.interface';
import {UserRepository} from './user.repository';
import {hashPassword} from '@common/utils/password.encrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
    }

    async getAll(): Promise<UserInterface[]> {
        return await this.userRepository.find();
    }

    async getById(id: number): Promise<UserInterface> {
        return await this.userRepository.findOne({
            where: {id}
        });
    }

    async getByEmail(email: string): Promise<UserInterface> {
        return await this.userRepository.findByEmail(email);
    }

    async create(user: UserInputInterface): Promise<UserInterface> {
        const {password, ...userData} = user;
        const passwordHash = await hashPassword(password);

        return await this.userRepository.save({
            ...userData,
            password: passwordHash
        });
    }

    async update(id: number, data: Partial<UserInterface>): Promise<UserInterface> {
        const user = await this.getById(id);
        const {password, ...restData} = data;

        if (!user) {
            throw new NotFoundException();
        }

        const updatedUser: typeof data = {...user, ...restData};

        if (password) {
            updatedUser.password = await hashPassword(password);
        }

        return await this.userRepository.save(updatedUser);
    }

    async delete(id: number): Promise<UserInterface> {
        const deletedUser = await this.getById(id);
        await this.userRepository.delete(deletedUser.id);

        return deletedUser;
    }
}
