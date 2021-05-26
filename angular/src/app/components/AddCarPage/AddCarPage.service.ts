import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AddCarPageService {

  constructor(private http: HttpClient) { }

  createCar(data: any) {
    return this.http.post(`${baseUrl}/create-car/`, data);
  }

}
