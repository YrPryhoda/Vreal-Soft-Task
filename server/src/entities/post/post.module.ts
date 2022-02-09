import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PostService} from './post.service';
import {PostRepository} from './post.repository';
import {UsersEntityModule} from '@entities/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostRepository]),
        UsersEntityModule
    ],
    providers: [PostService],
    exports: [PostService]
})
export class PostEntityModule {
}
