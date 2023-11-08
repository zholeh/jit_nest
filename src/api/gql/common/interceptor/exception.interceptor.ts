import { CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServiceExceptions } from '../../../../exception/service';
import { GqlError, GqlExceptions } from '../exception';
import { objectKeys } from '../../../../helper/objectKeys';

function mapToHttpError<T extends Error>(err: T) {
  const keys = objectKeys(ServiceExceptions);

  keys.forEach((key) => {
    if (err instanceof ServiceExceptions[key]) {
      return GqlExceptions[key];
    }
  });

  return new GqlError(err.message);
}

@Injectable()
export class ExceptionsGqlInterceptor implements NestInterceptor {
  logger = new Logger('GQL interceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof HttpException) return throwError(() => err);
        const error = mapToHttpError(err);
        return throwError(() => error);
      }),
    );
  }
}
