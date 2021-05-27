import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './components/HomePage/HomePage.component';
import { CarPage } from './components/CarPage/CarPage.component';
import { AddCarPage } from './components/AddCarPage/AddCarPage.component';
import { AdminGuard } from './auth.service';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'cars/:id', component: CarPage },
  { path: 'add-car', component: AddCarPage, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
