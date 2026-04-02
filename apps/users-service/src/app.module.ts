import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { RmqModule } from './rmq/rmq.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:prisma@localhost/nest?authSource=admin'), UsersModule, RmqModule],
})
export class AppModule {}
