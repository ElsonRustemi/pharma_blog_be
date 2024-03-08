// post.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    title: string;

    @Column({nullable: true})
    content: string;

    @Column({nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdOn: Date;

    @Column({nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    modifiedOn: Date;

    @Column({nullable: true})
    imagePath: string;

    // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    // createdAt: Date;
}
