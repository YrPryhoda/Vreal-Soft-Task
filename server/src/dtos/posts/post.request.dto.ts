import {IsNotEmpty, IsString, Length} from 'class-validator';

export class PostsRequestDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 256, {message: 'title must be between 1 and 128 characters'})
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly content: string;
}
