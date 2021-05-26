import { Component, OnInit } from '@angular/core';
import { AddCarPageService } from './AddCarPage.service';
import { MessageManagerService } from '../MessageManager/MessageManager.service';

export enum CarStatus {
  FREE = 0,
  RENTED
}

@Component({
  selector: 'add-car-page',
  templateUrl: './AddCarPage.component.html',
  styleUrls: ['./AddCarPage.component.scss']
})
export class AddCarPage implements OnInit {
  car = {
    type: "",
    rentPrice: "",
    image: ""
  };
  previewImageSrc: string | ArrayBuffer | null = null;

  constructor(private addCarPageService: AddCarPageService, private messageManager: MessageManagerService) { }

  ngOnInit() { }

  onImageChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.previewImageSrc = reader.result;

      reader.readAsDataURL(file);

      this.car.image = file;
    }
  }

  resetForms() {
    this.car =  {
      type: "",
      rentPrice: "",
      image: ""
    };

    this.previewImageSrc = null;
  }

  saveCar() {
    const formData = new FormData();

    formData.append('type', this.car.type);
    formData.append('rentPrice', this.car.rentPrice);
    formData.append('image', this.car.image);

    this.addCarPageService.createCar(formData)
      .subscribe(
        (response: any) => {
          this.messageManager.setMessages([{type: "success", text: 'Car created successfully.'}]);
          this.resetForms();
        },
        (error:any) => {
          console.error(error);
          this.messageManager.setMessages([{type: "error", text: 'Car creation failed.'}]);
        }
      );
  }
}
