import {PostInterface} from '@entities/post/interfaces/post.interface';
import {UsersResponseDto} from '@dtos/users';

export class PostsResponseDto {
    private id: number;
    private title: string;
    private content: string;
    private createdAt: Date;
    private user: UsersResponseDto;
    private updatedAt: Date;

    constructor(post?: PostInterface) {
        if (post) {
            this.id = post.id;
            this.title = post.title;
            this.content = post.content;
            this.createdAt = post.createdAt;
            this.updatedAt = post.updatedAt;
            this.user = new UsersResponseDto(post.user);
        }
    }
}
