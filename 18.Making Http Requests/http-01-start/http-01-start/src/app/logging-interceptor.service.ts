import { HttpHandler, HttpEventType } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('outgoing request');
    console.log(req.url);
    console.log(req.headers);
    return next.handle(req).pipe(tap(event=>{
      
      if(event.type === HttpEventType.Response){
      console.log('incoming response');
      console.log(event.body);
      }

    }));
  }
}
