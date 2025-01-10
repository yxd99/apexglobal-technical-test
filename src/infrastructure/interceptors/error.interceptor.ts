import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';

@Catch()
export class ErrorInterceptor implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception?.status || 500;
    const message = exception?.response?.message || exception?.message || 'Internal Server Error';
    const name = getReasonPhrase(status);

    response.status(status).json({
      name,
      code: status,
      data: { message },
    });
  }
}
