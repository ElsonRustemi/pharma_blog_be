import { Module } from '@nestjs/common';
import { PostModule } from './posts/posts.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    PostModule, // Import your PostModule
    TypeOrmModule.forRoot(ormOptions), AuthModule, // Import TypeOrmModule and configure it
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
