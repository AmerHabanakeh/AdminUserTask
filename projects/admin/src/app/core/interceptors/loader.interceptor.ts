import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from 'projects/shared/spinner.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private LoaderService:SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.LoaderService.addApi();
    return next.handle(request).pipe(finalize(()=>{
      this.LoaderService.removeApi()
    }));
  }
}
