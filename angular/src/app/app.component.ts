import { Component, OnInit } from '@angular/core';
import { UserService } from './User.service';

export const baseUrl = 'http://localhost:8080';

export type RegistrationUser = {
  email: string;
  username: string;
  password: string;
}

export type LoginUser = {
  username: string;
  password: string;
}

export enum MenuState {
  HIDDEN,
  REGISTRATION,
  LOGIN,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public MenuState = MenuState;

  public loginUser: LoginUser;
  public registrationUser: RegistrationUser;
  isProfileMenuOpen: boolean = false;
  menuState: MenuState = MenuState.HIDDEN;
  isLoginOpen: boolean = false;
  isRegistrationOpen: boolean = false;


  constructor(public userService: UserService) { }

  ngOnInit() {
    this.resetForms();
  }

  resetForms() {
    this.loginUser = {
      username: '',
      password: ''
    };

    this.registrationUser = {
      email: '',
      username: '',
      password: ''
    };
  }

  toggleMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  hideMenu() {
    this.menuState = MenuState.HIDDEN;
  }

  showLogin() {
    this.menuState = MenuState.LOGIN;
  }

  showRegistration() {
    this.menuState = MenuState.REGISTRATION;
  }

  login() {
    this.userService.login({
      username: this.loginUser.username,
      password: this.loginUser.password
    }, () => this.resetForms());
  }

  registration() {
    this.userService.registration({
      email: this.registrationUser.email,
      username: this.registrationUser.username,
      password: this.registrationUser.password
    }, () => this.resetForms());
  }

  logout() {
    this.userService.logout();
  }
}
