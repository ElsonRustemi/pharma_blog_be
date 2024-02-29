import { Module } from '@nestjs/common';
import { PostModule } from './posts/posts.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    PostModule, // Import your PostModule
    TypeOrmModule.forRoot(ormOptions), // Import TypeOrmModule and configure it
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
