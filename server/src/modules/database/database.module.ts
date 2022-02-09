import {getConnectionOptions} from 'typeorm';

import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {UsersEntityModule} from '@entities/user/user.module';

@Module({
    imports: [
        UsersEntityModule,
        TypeOrmModule.forRootAsync({
            useFactory: async () =>
                Object.assign(await getConnectionOptions(), {
                    autoLoadEntities: true
                })
        })
    ]
})
export class DatabaseModule {
}
