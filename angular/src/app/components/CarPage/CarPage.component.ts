import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Car } from '../HomePage/HomePage.component';
import { MessageManagerService } from '../MessageManager/MessageManager.service';
import { CarPageService } from './CarPage.service';

@Component({
  selector: 'car-page',
  templateUrl: './CarPage.component.html',
  styleUrls: ['./CarPage.component.scss']
})
export class CarPage implements OnInit {
  car: Car;

  constructor(
    private route: ActivatedRoute,
    private carPageService: CarPageService,
    private messageManager: MessageManagerService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.carPageService.getCar(params['id']).subscribe(
        data => {
          this.car = data as Car;
        },
        error => {
          console.error(error);
          this.messageManager.setMessages([{type: "error", text: 'Failed to get car data.'}]);
        }
      );
      
    });
  }

}
