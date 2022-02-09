import {
    BadRequestException,
    Controller,
    UseGuards,
    HttpCode,
    Body,
    Delete,
    Param,
    Post,
    Get,
    Put, Req
} from '@nestjs/common';
import {StatusCodes} from 'http-status-codes';

import {PostService} from '@entities/post/post.service';
import {JwtAuthGuard} from '@common/guards/auth/jwt-auth.guard';
import {PostsGuard} from '@common/guards/credentials/post.update.credentials.guard';
import {PostsRequestDto, PostsResponseDto} from '@dtos/posts';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostService) {
    }

    @Get()
    async findAll(): Promise<PostsResponseDto[]> {
        const posts = await this.postsService.getAll();
        return posts.map(post => new PostsResponseDto(post));
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PostsResponseDto> {
        const post = await this.postsService.getById(id);
        return new PostsResponseDto(post);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(StatusCodes.CREATED)
    async create(
        @Req() req,
        @Body() data: PostsRequestDto
    ): Promise<PostsResponseDto> {
        try {
            const userId = req.user.id;
            const post = await this.postsService.create(userId, data);
            return new PostsResponseDto(post);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Put(':id')
    @UseGuards(PostsGuard)
    @UseGuards(JwtAuthGuard)
    @HttpCode(StatusCodes.CREATED)
    async update(
        @Param('id') id: number,
        @Body() data: PostsRequestDto
    ): Promise<PostsResponseDto> {
        try {
            const post = await this.postsService.update(id, data);
            return new PostsResponseDto(post);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Delete(':id')
    @UseGuards(PostsGuard)
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: number): Promise<PostsResponseDto> {
        const post = await this.postsService.delete(id);
        return new PostsResponseDto(post);
    }
}
