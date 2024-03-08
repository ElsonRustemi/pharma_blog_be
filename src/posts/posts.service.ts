import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "../Entity/post.entity";
import { Repository } from "typeorm";
import { CreatePostDto } from "src/DTO/create-post.dto";
import { UpdatePostDto } from "src/DTO/update-post.dto";

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
    ) { }

    /**
     * 
     * @returns 
     */
    async getAllPosts() {
        return await this.postRepository.find();
    }

    // async findAll(): Promise<PostEntity[]> {
    //     return await this.postRepository.find();
    // }

    /**
     * 
     * @param id 
     * @returns 
     */
    async findOne(id: number): Promise<PostEntity> {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new BadRequestException("Post not found");
        }
        return post;
        // return await this.postRepository.findOne({ where: { id } });
    }

    async create(createPostDto: CreatePostDto): Promise<any> {
        return await this.postRepository.insert(createPostDto);
    }

    /**
     * 
     * @param id 
     * @param updatePostDto 
     * @returns 
     */
    async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<any> {
        return await this.postRepository.update(id, updatePostDto);
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    async deletePost(id: number) {
        return await this.postRepository.delete(id);
    }

}