import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const errorResponse = {
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }
}
