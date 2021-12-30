import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  Catch,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const buildResponse = (exception: any, status: number, message: string) => {
      const responseBody = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(request),
        message: message,
      };

      httpAdapter.reply(response, responseBody, status);
    };

    // QueryFailedError
    if (exception instanceof QueryFailedError) {
      buildResponse(
        exception,
        HttpStatus.INTERNAL_SERVER_ERROR,
        exception.message,
      );
    }
    // HttpException
    else if (exception instanceof HttpException) {
      const response = exception.getResponse() as any;
      const message = response.message;
      buildResponse(exception, exception.getStatus(), message);
    }
    // EntityNotFoundError
    else if (exception instanceof EntityNotFoundError) {
      buildResponse(
        exception,
        HttpStatus.UNPROCESSABLE_ENTITY,
        exception.message,
      );
    }
    // Unknown Error
    else {
      buildResponse(
        exception,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Server error',
      );
    }

    console.log(exception.constructor.name);
    console.log(JSON.stringify(exception, null, 2));
  }
}
