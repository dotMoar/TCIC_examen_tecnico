import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo post' })
  @ApiResponse({ status: 201, description: 'Post creado correctamente' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }
  @Get()
  @ApiOperation({ summary: 'Listar todos los posts activos' })
  @ApiResponse({ status: 200, description: 'Lista de posts' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'authorId',
    required: false,
    type: String,
    example: 'user-123',
  })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('authorId') authorId?: string,
  ) {
    return this.postsService.findAll(+page, +limit, authorId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un post por ID' })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un post existente' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un post' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
