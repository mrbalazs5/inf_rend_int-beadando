import { Component, OnInit } from '@angular/core';
import { HomePageService } from './HomePage.service';
import { UserService } from '../../User.service';
import { MessageManagerService } from '../MessageManager/MessageManager.service';
import { Router } from '@angular/router';

export enum Status {
  FREE = 0,
  RENTED
}

export type Car = {
  id: number;
  type: string;
  rentPrice: number;
  status: number;
  rentalCustomer: number;
  image_url: string;
}

export const statusLabelMap: {[key: string]: string} = {
  [Status.FREE]: "Free",
  [Status.RENTED]: "Rented"
}

@Component({
  selector: 'home-page',
  templateUrl: './HomePage.component.html',
  styleUrls: ['./HomePage.component.scss']
})
export class HomePage implements OnInit {
  cars: Car[];
  status = Status
  
  public getStatusLabel = (status: number) => statusLabelMap[status];

  constructor(
    private homePageService: HomePageService,
    private messageManager: MessageManagerService,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchCars();
  }

  fetchCars(): void {
    this.homePageService.getAllCars()
      .subscribe(
        data => {
          this.cars = data as Car[];
        },
        error => {
          console.error(error);
          this.messageManager.setMessages([{type: "error", text: 'Failed to get cars.'}]);
        }
      );
  }

  rentCar(id: number): void {
    try {
      if(!this.userService.getUser()) {
        throw new Error('Failed to get user.');
      }
      this.homePageService.rentCar(id, this.userService.getUser()?.id).subscribe(
        data => {
          this.fetchCars();
          this.messageManager.setMessages([{type: "success", text: 'Car rented successfully.'}]);
        },
        error => {
          throw error;
        }
      );
    } catch(e) {
      console.error(e);
      this.messageManager.setMessages([{type: "error", text: 'Car rent failed.'}]);
    }
  }

  freeCar(id: number): void {
    this.homePageService.freeCar(id, this.userService.getUser()?.id).subscribe(
      data => {
        this.fetchCars();
        this.messageManager.setMessages([{type: "success", text: 'Car freed successfully.'}]);
      },
      error => {
        console.error(error);
        this.messageManager.setMessages([{type: "error", text: 'Car freeing failed.'}]);
      }
    );
  }

  moveToCarPage(id: number): void {
    this.router.navigate(["cars", id]);
  }
}
