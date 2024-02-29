import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "../Entity/post.entity";
import { Repository } from "typeorm";
import { CreatePostDto } from "src/DTO/create-post.dto";

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
    ) { }

    async getAllPosts() {
        return await this.postRepository.find();
    }

    // async findAll(): Promise<PostEntity[]> {
    //     return await this.postRepository.find();
    // }

    async findOne(id: number): Promise<PostEntity> {
        return await this.postRepository.findOne({ where: { id } });
    }

    async create(createPostDto: CreatePostDto): Promise<PostEntity> {

        const post: PostEntity = new PostEntity();
        const {title, content, imagePath } = createPostDto;

        post.title = title;
        post.content = content;
        post.imagePath = imagePath;

        this.postRepository.create(post);

        try {
            return await this.postRepository.save(post);
        } catch (error) {
            throw new InternalServerErrorException("Something went wrong, post was not created.");
        }
    }

    async updatePost(id: number, post: Partial<PostEntity>): Promise<PostEntity> {
        // Fetch the post from the database
        const existingPost = await this.postRepository.findOne({ where: { id } });

        // Ensure the post exists
        if (!existingPost) {
            throw new Error(`Post with id ${id} not found.`);
        }

        // Update only the provided properties
        Object.assign(existingPost, post);

        // Save the updated post to the database
        await this.postRepository.save(existingPost);

        // Return the updated post
        return existingPost;
    }

    async deletePost(id: number) {
        return await this.postRepository.delete(id);
    }

}