import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private http: HttpClient) { }

  getAllCars() {
    return this.http.get(`${baseUrl}/get-cars/`);
  }

  rentCar(carId: number, userId: number | null) {
    return this.http.patch(`${baseUrl}/rent-car/${carId}/`, { rentalCustomer: userId || null });
  }

  freeCar(carId: number, userId: number | null) {
    return this.http.patch(`${baseUrl}/free-car/${carId}/`, { rentalCustomer: userId || null });
  }

}
