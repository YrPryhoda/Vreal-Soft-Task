import {Module} from '@nestjs/common';

import {UsersApiModule} from './users/users.module';
import {PostsApiModule} from './posts/posts.module';
import {AuthApiModule} from '@api/auth/auth.module';

@Module({
    imports: [UsersApiModule, PostsApiModule, AuthApiModule]
})
export class ApiModule {
}
