import { Body, Controller, Get, Param, Put, Post, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostEntity } from '../Entity/post.entity';
import { CreatePostDto } from 'src/DTO/create-post.dto';

@Controller('posts')
export class PostsController {

    constructor(private readonly postService: PostsService) {}

    @Get()
    getAllPosts() {
        return this.postService.getAllPosts();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<PostEntity> {
        return this.postService.findOne(+id);
    }

    @Post()
    create(@Body() post: CreatePostDto) {
        return this.postService.create(post);
    }

    @Put(':id')
    updatePost(@Param('id') id: number, @Body() post: PostEntity): Promise<PostEntity> {
        return this.postService.updatePost(id, post);
    }

    @Delete(':id')
    deletePost(@Param('id') id: number) {
        return this.postService.deletePost(id);
    }
}
