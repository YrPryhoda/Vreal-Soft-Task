import {Module} from '@nestjs/common';
import {PostsController} from '@api/posts/posts.controller';
import {PostEntityModule} from '@entities/post/post.module';
import {PostsGuard} from '@common/guards/credentials/post.update.credentials.guard';

@Module({
    controllers: [PostsController],
    imports: [PostEntityModule],
    providers: [PostsGuard]
})
export class PostsApiModule {
}
