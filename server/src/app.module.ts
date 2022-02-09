import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {ApiModule} from '@api/api.module';

import {DatabaseModule} from '@modules/database/database.module';

@Module({
    imports: [
        ApiModule,
        DatabaseModule,
        ConfigModule.forRoot({isGlobal: true})
    ]
})
export class AppModule {
}
