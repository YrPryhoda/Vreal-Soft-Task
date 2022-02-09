import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import {PostInterface} from '@entities/post/interfaces/post.interface';
import {User} from '@entities/user/user.entity';

@Entity()
export class Post implements PostInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 256, nullable: false})
    title: string;

    @Column({type: 'text', nullable: false})
    content: string;

    @CreateDateColumn({update: false})
    createdAt: Date;

    @UpdateDateColumn({update: true})
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.posts, {
        onDelete: 'CASCADE'
    })
    user: User;
}
