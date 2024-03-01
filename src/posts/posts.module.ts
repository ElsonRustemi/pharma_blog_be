import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "../Entity/post.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([PostEntity]),
        AuthModule
    ],
    controllers: [PostsController],
    providers: [PostsService]
})

export class PostModule { }