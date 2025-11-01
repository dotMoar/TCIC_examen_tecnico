import { ApiResponse } from "../types/apiResponse";
import { HttpMethod } from "./enums/httpMethods";


const BASE_URL = "http://localhost:3000";

async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            const errorBody = await safeJson(response);
            return {
                ok: false,
                error: {
                    status: response.status,
                    message: errorBody?.message || getErrorMessage(response.status),
                    details: errorBody,
                },
            };
        }

        const data = await safeJson(response);
        return { ok: true, data };
    } catch (err: any) {
        return {
            ok: false,
            error: {
                status: 0,
                message: err.message || "Error de red o conexión perdida",
            },
        };
    }
}

async function safeJson(response: Response) {
    try {
        return await response.json();
    } catch {
        return null;
    }
}

function getErrorMessage(status: number): string {
    switch (status) {
        case 400:
            return "Solicitud inválida.";
        case 401:
            return "No autorizado.";
        case 403:
            return "Acceso denegado.";
        case 404:
            return "Recurso no encontrado.";
        case 409:
            return "Conflicto de datos.";
        case 500:
            return "Error interno del servidor.";
        default:
            return "Error desconocido en el servidor.";
    }
}

export const fetchHandler = {
    get: async <T>(endpoint: string, config?: RequestInit) =>
        request<T>(endpoint, { method: HttpMethod.GET, ...config }),

    post: async <T>(endpoint: string, body?: any, config?: RequestInit) =>
        request<T>(endpoint, {
            method: HttpMethod.POST,
            headers: { "Content-Type": "application/json", ...(config?.headers || {}) },
            body: JSON.stringify(body),
            ...config,
        }),

    put: async <T>(endpoint: string, body?: any, config?: RequestInit) =>
        request<T>(endpoint, {
            method: HttpMethod.PUT,
            headers: { "Content-Type": "application/json", ...(config?.headers || {}) },
            body: JSON.stringify(body),
            ...config,
        }),

    patch: async <T>(endpoint: string, body?: any, config?: RequestInit) =>
        request<T>(endpoint, {
            method: HttpMethod.PATCH,
            headers: { "Content-Type": "application/json", ...(config?.headers || {}) },
            body: JSON.stringify(body),
            ...config,
        }),

    delete: async <T>(endpoint: string, config?: RequestInit) =>
        request<T>(endpoint, { method: HttpMethod.DELETE, ...config }),
};
