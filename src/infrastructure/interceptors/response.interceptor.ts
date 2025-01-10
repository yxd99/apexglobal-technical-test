import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, HttpException } from '@nestjs/common';
import { getReasonPhrase } from 'http-status-codes';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data) => {
          const response = context.switchToHttp().getResponse();
          const statusCode = data ? response.statusCode : 204; 
          const name = getReasonPhrase(statusCode);
          
          const result = {
            name,
            code: statusCode,
            data: data || null,
          }

          return result;
        }),
        catchError((error) => {
          const response = {
            code: error.status,
            name: getReasonPhrase(error.status),
            data: error.response?.message,
          }
          return throwError(() => new HttpException(response, error.status));
        }),
      );
  }
}
