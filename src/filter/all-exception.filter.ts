import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  Catch,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const buildResponse = (exception: any, status: number) => {
      const responseBody = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(request),
        message: exception.response?.message?.toString(),
      };

      httpAdapter.reply(response, responseBody, status);
    };

    // QueryFailedError
    if (exception instanceof QueryFailedError) {
      buildResponse(exception, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // HttpException
    else if (exception instanceof HttpException) {
      buildResponse(exception, exception.getStatus());
    }
    // Unknown Error
    else {
      buildResponse(exception, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    console.log(JSON.stringify(exception, null, 2));
  }
}
