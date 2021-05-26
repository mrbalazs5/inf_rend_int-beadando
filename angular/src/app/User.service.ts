import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl, LoginUser } from "./app.component";
import { RegistrationUser } from "./app.component";
import { MessageManagerService } from "./components/MessageManager/MessageManager.service";
import * as moment from 'moment';
import { tap, shareReplay } from 'rxjs/operators';

export type User = {
  id: number;
  email: string;
  username: string;
}

@Injectable()
export class UserService {

  private httpOptions: any;

  public loginErrors: any = [];

  public registrationErrors: any = [];

  constructor(private http: HttpClient, private messageManager: MessageManagerService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  public registration(user: RegistrationUser, onSuccess: () => any): void {
    this.http.post(`${baseUrl}/registration/`, JSON.stringify(user), this.httpOptions).subscribe(
      (data: any) => {
        this.messageManager.setMessages([{type: "success", text: 'Registration successful. You can login now.'}]);
        
        onSuccess();
      },
      (err: any) => {
        this.registrationErrors = err['error'];
        this.messageManager.setMessages([{type: "error", text: 'Registration failed.'}]);
      }
    );
  }

  public login(user: LoginUser, onSuccess: () => any): void {
    this.http.post(`${baseUrl}/api-token-auth/`, JSON.stringify(user), this.httpOptions).subscribe(
      (data: any) => {
        this.updateData(data['token']);

        this.messageManager.setMessages([{type: "success", text: 'Login successful.'}]);

        onSuccess();
      },
      (err: any) => {
        this.loginErrors = err['error'];
        this.messageManager.setMessages([{type: "error", text: 'Login failed.'}]);
      }
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    
    const expiresAt = !!expiration ? JSON.parse(expiration) : null;

    return moment(expiresAt);
  }

  refreshToken() {
    const token = this.getToken();
    const expiration = this.getExpiration();

    if (moment().isBetween(expiration.subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(
        `${baseUrl}/api-token-refresh/`,
        { token: token }
      ).pipe(
        tap((response: any) => this.updateData(response['token'])),
        shareReplay(),
      ).subscribe();
    } else {
      return null;
    }
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');

    this.messageManager.setMessages([{type: "success", text: 'Logout successful.'}]);
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expires_at');

    if(!token || !expiration) {
      return false;
    }

    const expiresAt = JSON.parse(expiration);
    const expDate = moment(expiresAt);

    return moment().isBefore(expDate);
  }

  public isLoggedIn(): boolean {
    return this.isTokenValid();
  }

  public getUser() {
    try {
      const token = localStorage.getItem('token');
      if(!token) {
        throw new Error('Token not found.');
      }
      const token_parts = token.split(/\./);
      const token_decoded = JSON.parse(window.atob(token_parts[1]));
  
      return {
        id: token_decoded.user_id,
        email: token_decoded.email,
        username: token_decoded.username
      }
    } catch(e) {
      console.error(e);
      this.messageManager.setMessages([{type: "error", text: 'Failed to get user.'}]);

      return null;
    }
  }

  private updateData(token: string): void {
    this.loginErrors = [];

    const token_parts = token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));

    const expiresAt = moment.unix(token_decoded.exp);

    localStorage.setItem('token', token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

}
