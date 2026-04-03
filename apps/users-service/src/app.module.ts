import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { RmqModule } from './rmq/rmq.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    HealthcheckModule,
    UsersModule,
    RmqModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
})
export class AppModule {}
