/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePostDto } from '../models/CreatePostDto';
import type { UpdatePostDto } from '../models/UpdatePostDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostsService {
    /**
     * Crear un nuevo post
     * @param requestBody
     * @returns any Post creado correctamente
     * @throws ApiError
     */
    public static postsControllerCreate(
        requestBody: CreatePostDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Listar posts con búsqueda opcional
     * @param authorId
     * @param search
     * @param limit
     * @param page
     * @returns any
     * @throws ApiError
     */
    public static postsControllerFindAll(
        authorId: string,
        search?: string,
        limit?: any,
        page?: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts',
            query: {
                'authorId': authorId,
                'search': search,
                'limit': limit,
                'page': page,
            },
        });
    }
    
    /**
     * Obtener un post por ID
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static postsControllerFindOne(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Actualizar un post existente
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postsControllerUpdate(
        id: string,
        requestBody: UpdatePostDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/posts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Eliminar (soft delete) un post
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static postsControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/posts/{id}',
            path: {
                'id': id,
            },
        });
    }
}
