import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import { Post } from '../src/posts/entities/post.entity';

/* Leer: https://delvingdeveloper.com/posts/end-to-end-testing-nestjs*/
/* TODO: hacer casos de error con el http interceptor*/
describe('PostsController (e2e)', () => {
  let app: INestApplication;
  let createdPostId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: +process.env.DATABASE_PORT || 5432,
          //ver por que no funciona con las variables de entorno
          username: process.env.POSTGRES_USER || 'nest_tcit',
          password: process.env.POSTGRES_PASSWORD || 'tcit',
          database: process.env.POSTGRES_DB || 'tcit_database',
          entities: [Post],
          synchronize: true,
          logging: false,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST', async () => {
    const response = await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'Nuevo post e2e',
        description: 'Contenido de prueba real con PostgreSQL',
        authorId: 'autor123',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Nuevo post e2e');
    createdPostId = response.body.id;
  });

  it('/GET', async () => {
    const response = await request(app.getHttpServer())
      .get('/posts')
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.total).toBeGreaterThanOrEqual(1);
  });

  it('/GET', async () => {
    const response = await request(app.getHttpServer())
      .get(`/posts/${createdPostId}`)
      .expect(200);

    expect(response.body.id).toBe(createdPostId);
  });

  it('/PATCH ', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/posts/${createdPostId}`)
      .send({ title: 'Post actualizado e2e' })
      .expect(200);

    expect(response.body.title).toBe('Post actualizado e2e');
  });

  it('/DELETE', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/posts/${createdPostId}`)
      .expect(200);

    expect(response.body.message).toContain('eliminado correctamente');
  });
});
