import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class VehicleService {
   SERVER_URL = "https://ttcs-booking-bus.herokuapp.com/api/v1";

  constructor(private http: HttpClient) {
  }

  getVehicle(page?:number) {
    return this.http.get(`${this.SERVER_URL}/vehicles/all?pageNumber=${page}`);
  }


  // creatStation(stations:Customers) {
  //   return this.http.post(`${this.SERVER_URL}/stations`,stations);
  // }


  // updateStation(stations:Customers,id:string) {
  //   return this.http.put(`${this.SERVER_URL}/stations/${id}`,stations);
  // }

  // deleteStation(id:string) {
  //   return this.http.delete(`${this.SERVER_URL}/stations/${id}`);
  // }
}
