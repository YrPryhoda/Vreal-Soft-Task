import {Module} from '@nestjs/common';

import {AuthEntityModule} from '@entities/auth/auth.module';
import {UsersEntityModule} from '@entities/user/user.module';
import {AuthController} from './auth.controller';

@Module({
    imports: [AuthEntityModule, UsersEntityModule],
    controllers: [AuthController],
    providers: []
})
export class AuthApiModule {
}
