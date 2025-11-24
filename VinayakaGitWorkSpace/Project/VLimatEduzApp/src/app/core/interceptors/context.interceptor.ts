import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppStateService } from '../services/app-state.service';

@Injectable()
export class ContextInterceptor implements HttpInterceptor {
  private appState = inject(AppStateService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Skip adding headers for JSON files (assets)
    if (request.url.endsWith('.json')) {
      return next.handle(request);
    }

    // Get values from AppStateService
    const state = this.appState.userState();
    const { userId, userName, academicId, academicName, fyId, fy } = state;

    // Clone the request and add headers
    // We use a clone because HttpRequests are immutable
    let headers = request.headers;

    if (userId != null) headers = headers.set('UserId', userId.toString());
    if (userName) headers = headers.set('UserName', userName);
    
    if (academicId != null) headers = headers.set('AcademicId', academicId.toString());
    if (academicName) headers = headers.set('AcademicName', academicName);
    
    if (fyId != null) headers = headers.set('FyId', fyId.toString());
    if (fy) headers = headers.set('Fy', fy);

    const modifiedReq = request.clone({ headers });
    return next.handle(modifiedReq);
  }
}
