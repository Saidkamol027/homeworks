import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './categorys/category.module';
import { CommentModule } from './comments/comment.module';
import { PostModule } from './posts/post.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/vazifa'),
    UsersModule,
    PostModule,
    CommentModule,
    CategoryModule,
  ],
})
export class AppModule {}
