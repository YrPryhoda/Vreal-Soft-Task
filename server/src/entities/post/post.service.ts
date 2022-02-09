import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';

import {PostInputInterface, PostInterface} from './interfaces/post.interface';
import {UsersService} from '@entities/user/users.service';
import {PostRepository} from './post.repository';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostRepository)
        private postRepository: PostRepository,
        private userService: UsersService
    ) {
    }

    async getAll(): Promise<PostInterface[]> {
        return await this.postRepository.find({
            relations: ['user']
        });
    }

    async getById(id: number): Promise<PostInterface> {
        return await this.postRepository.findOne({
            where: {id},
            relations: ['user']
        });
    }

    async create(userId: number, post: PostInputInterface): Promise<PostInterface> {
        const user = await this.userService.getById(userId);
        if (!user) {
            throw new NotFoundException();
        }
        const newPost = {...post, user};
        return await this.postRepository.save(newPost);
    }

    async update(id: number, data: Partial<PostInputInterface>): Promise<PostInterface> {
        const post = await this.getById(id);
        const updatedPost = {...post, ...data};
        return await this.postRepository.save(updatedPost);
    }

    async delete(id: number): Promise<PostInterface> {
        const deletedPost = await this.getById(id);
        await this.postRepository.delete(deletedPost.id);

        return deletedPost;
    }
}
