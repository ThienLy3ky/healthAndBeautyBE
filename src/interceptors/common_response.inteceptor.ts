import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { CryptoService } from 'src/shared/crypto/crypto.service';

@Injectable()
export class CommonResInterceptor implements NestInterceptor {
  // constructor(private readonly cryptoService: CryptoService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    // const isEnableEncrypt = req.isEnableEncrypt;

    return next.handle().pipe(
      map((payload) => {
        // if (isEnableEncrypt) {
        //   return this.cryptoService.encryptObject({
        //     success: true,
        //     data: payload,
        //   });
        // }
        // if (!isEnableEncrypt) {
        return {
          success: true,
          data: payload,
        };
        // }
      }),
    );
  }
}
