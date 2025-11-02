import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

/*
- Verificar que el servicio exista
- Crear un post mock
- Obtener todos los posts activos con paginación mock
- Obtener un post por id mock ??
- Lanzar NotFoundException si no existe
- Actualizar un post existente
- Eliminar un post y marcar softdelete
- TODO: que no traiga post deleteados
*/

const mockPostRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findAndCount: jest.fn(),
  findOne: jest.fn(),
});

function createMockPost(overrides: Partial<Post> = {}): Post {
  return {
    id: '1',
    title: 'Post de prueba',
    description: 'eaeaeaeaeaeaeaeaeae',
    authorId: 'user 132',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
    ...overrides,
  };
}

describe('PostsService', () => {
  let service: PostsService;
  let repository: jest.Mocked<Repository<Post>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useFactory: mockPostRepository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get(getRepositoryToken(Post));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debería crear un posteo', async () => {
      const dto: CreatePostDto = {
        title: 'Nuevo post',
        description: 'Contenido eaeaeaea',
        authorId: 'user123',
      };

      const createdPost = createMockPost({ id: 'uuid-123', ...dto });

      repository.create.mockReturnValue(createdPost);
      repository.save.mockResolvedValue(createdPost);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(createdPost);
      expect(result).toEqual(createdPost);
    });
  });

  describe('findAll', () => {
    it('debería retornar todos los posts activos', async () => {
      const posts = [createMockPost()];
      repository.findAndCount.mockResolvedValue([posts, 1]);

      const result = await service.findAll(1, 10);

      expect(repository.findAndCount).toHaveBeenCalledWith({
        where: { isDeleted: false },
        order: { createdAt: 'DESC' },
        skip: 0,
        take: 10,
      });

      expect(result).toEqual({
        data: posts,
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
    });
  });

  describe('findOne', () => {
    it('debería retornar un post existente', async () => {
      const post = createMockPost({ id: '123' });
      repository.findOne.mockResolvedValue(post);

      const result = await service.findOne('123');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123', isDeleted: false },
      });
      expect(result).toEqual(post);
    });

    it('debería lanzar NotFoundException si no existe', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debería actualizar un post existente', async () => {
      const existingPost = createMockPost({ id: '1' });
      const dto: UpdatePostDto = { title: 'Modificado' };

      repository.findOne.mockResolvedValue(existingPost);
      repository.save.mockResolvedValue({ ...existingPost, ...dto });

      const result = await service.update('1', dto);

      expect(result.title).toBe('Modificado');
      expect(repository.save).toHaveBeenCalledWith({
        ...existingPost,
        ...dto,
      });
    });
  });

  describe('remove', () => {
    it('debería marcar un post como eliminado (soft delete)', async () => {
      const existingPost = createMockPost({ id: '1' });

      repository.findOne.mockResolvedValue(existingPost);
      repository.save.mockResolvedValue({ ...existingPost, isDeleted: true });

      const result = await service.remove('1');

      expect(repository.save).toHaveBeenCalled();
      expect(result.message).toContain('eliminado');
    });
  });
});
