import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class CarPageService {

  constructor(private http: HttpClient) { }

  getCar(id: number) {
    return this.http.get(`${baseUrl}/get-car/${id}/`);
  }

}
