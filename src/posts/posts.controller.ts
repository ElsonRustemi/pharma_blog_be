import { Body, Controller, Get, Param, Put, Post, Delete, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostEntity } from '../Entity/post.entity';
import { CreatePostDto } from 'src/DTO/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {

    constructor(private readonly postService: PostsService) {}

    @Get()
    getAllPosts() {
        return this.postService.getAllPosts();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<PostEntity> {
        return this.postService.findOne(id);
    }

    // @UseGuards(AuthGuard())
    @Post()
    async create(@Body() createPostDto: CreatePostDto) {
        console.log(createPostDto);
        return await this.postService.create(createPostDto);
    }

    @Put(':id')
    updatePost(@Param('id') id: number, @Body() post: PostEntity): Promise<PostEntity> {
        return this.postService.updatePost(id, post);
    }

    @Delete(':id')
    deletePost(@Param('id') id: number) {
        return this.postService.deletePost(id);
    }

    @Post('upload-photo')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const name = file.originalname.split(".")[0];
                const fileExtension: string = file.originalname.split(".")[1]
                const newFileName: string = name.split(" ").join("_") + "_" + Date.now() + "." + fileExtension;
                cb(null, newFileName);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return cb(null, false);
            }
            cb(null, true);
        }
    }
    ))
    uploadPhoto(@UploadedFile() file: Express.Multer.File) {
        // console.log(file);
        if (!file) {
            throw new BadRequestException("File is not an image");
        } else {
            const response = {
                filePath: `http://localhost:3000/posts/pictures/${file.filename}`
            };
            return response;
        }
    }

    @Get('pictures/:filename')
    async getPictures(@Param('filename') filename, @Res() res: Response) {
        res.sendFile(filename, {root: './uploads'});

    }

}
