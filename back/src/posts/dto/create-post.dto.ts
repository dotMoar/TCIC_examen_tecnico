import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'Mi primer post',
    description: 'Título del post',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    example: 'Contenido de prueba',
    description: 'Descripción o cuerpo del post',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'user-123',
    required: false,
    description: 'ID opcional del autor',
  })
  @IsOptional()
  @IsString()
  authorId?: string;
}
