import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

/*
TODO:
- Verificar que el controlador se inicializa correctamente
- Crear un post
- Listar posts
- Obtener un post por ID
- Actualizar un post existente
- Eliminar un post (soft delete)
*/

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('debería delegar la creación al servicio', async () => {
      const dto: CreatePostDto = {
        title: 'Nuevo post',
        description: 'Contenido',
        authorId: 'user1',
      };
      const created: Post = {
        id: 'uuid-1',
        title: dto.title,
        description: dto.description,
        authorId: dto.authorId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      };

      jest.spyOn(service, 'create').mockResolvedValue(created);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(created);
    });
  });

  describe('findAll', () => {
    it('debería retornar todos los posts', async () => {
      const posts = [
        {
          id: '1',
          title: 'Post 1',
          description: 'Desc',
          authorId: 'user1',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          isDeleted: false,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(posts as any);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(posts);
    });
  });

  describe('findOne', () => {
    it('debería retornar un post por ID', async () => {
      const post = {
        id: '1',
        title: 'Post 1',
        description: 'Desc',
        authorId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(post as any);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(post);
    });
  });

  describe('update', () => {
    it('debería actualizar un post', async () => {
      const dto: UpdatePostDto = { title: 'Actualizado' };
      const updatedPost = {
        id: '1',
        title: 'Actualizado',
        description: 'Texto',
        authorId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedPost as any);

      const result = await controller.update('1', dto);

      expect(service.update).toHaveBeenCalledWith('1', dto);
      expect(result).toEqual(updatedPost);
    });
  });

  describe('remove', () => {
    it('Eliminar post', async () => {
      const response = { message: 'Post 1 eliminado correctamente' };

      jest.spyOn(service, 'remove').mockResolvedValue(response);

      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
      expect(result).toEqual(response);
    });
  });
});
