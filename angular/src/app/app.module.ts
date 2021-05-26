import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, AuthGuard } from './auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePage } from './components/HomePage/HomePage.component';
import { CarPage } from './components/CarPage/CarPage.component';
import { AddCarPage } from './components/AddCarPage/AddCarPage.component';
import { UserService } from './User.service';
import { MessageManager } from './components/MessageManager/MessageManager.component';
import { MessageManagerService } from './components/MessageManager/MessageManager.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    CarPage,
    AddCarPage,
    MessageManager
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    MessageManagerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
