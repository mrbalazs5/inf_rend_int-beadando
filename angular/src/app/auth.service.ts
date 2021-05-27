import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './User.service';
import { MessageManagerService } from './components/MessageManager/MessageManager.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router, 
    private messageManager: MessageManagerService
  ) { }

  canActivate() {
    if (this.userService.isLoggedIn()) {
      this.userService.refreshToken();

      return true;
    } else {
      this.router.navigate(['/']);

      this.messageManager.setMessages([{type: "error", text: 'You must log in to access this page.'}]);

      return false;
    }
  }
}

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
    private messageManager: MessageManagerService
  ) { }

  canActivate() {
    if (this.userService.isLoggedIn() && !!this.userService.getUser()?.is_superuser) {
      this.userService.refreshToken();

      return true;
    } else {
      this.router.navigate(['/']);

      this.messageManager.setMessages([{type: "error", text: 'You don\'t have permission to see this page.'}]);

      return false;
    }
  }
}