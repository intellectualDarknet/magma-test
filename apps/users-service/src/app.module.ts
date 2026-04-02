import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:prisma@localhost/nest?authSource=admin'), UsersModule],
})
export class AppModule {}
