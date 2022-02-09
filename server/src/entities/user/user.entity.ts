import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    Unique,
    OneToMany
} from 'typeorm';

import {UserRoleEnum} from '@enums/users/roles';
import {UserInterface} from './interfaces/user.interface';
import {Post} from '@entities/post/post.entity';

@Entity()
@Unique('email', ['email'])
export class User implements UserInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 128, nullable: false})
    firstName: string;

    @Column({type: 'varchar', length: 128, nullable: false})
    lastName: string;

    @Column({type: 'varchar', length: 128, nullable: false})
    email: string;

    @Column({type: 'varchar', length: 128, nullable: false})
    password: string;

    @Column({type: 'varchar', length: 256, nullable: true, default: null})
    token: string;

    @Column({type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER})
    role: UserRoleEnum;

    @CreateDateColumn({update: false})
    createdAt: Date;

    @UpdateDateColumn({update: true})
    updatedAt: Date;

    @OneToMany(() => Post, (post) => post.user, {
        onDelete: 'CASCADE'
    })
    posts: Post[];
}
