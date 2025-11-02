import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    return await this.postRepository.save(post);
  }

  async findAll(page = 1, limit = 10, authorId?: string) {
    const where: any = { isDeleted: false };
    if (authorId) where.authorId = authorId;

    const [data, total] = await this.postRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id, isDeleted: false },
    });

    if (!post) throw new NotFoundException(`Post con id ${id} no encontrado`);
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    return await this.postRepository.save(post);
  }

  async remove(id: string): Promise<{ message: string }> {
    const post = await this.findOne(id);
    post.isDeleted = true;
    post.deletedAt = new Date();
    await this.postRepository.save(post);

    return { message: `Post ${id} eliminado correctamente` };
  }
}
