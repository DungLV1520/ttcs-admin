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

  getVehicleSeatID(id?:string) {
    return this.http.get(`${this.SERVER_URL}/seats/${id}`);
  }

  creatVehicle(stations:any) {
    return this.http.post(`${this.SERVER_URL}/vehicles`,stations);
  }

  updateVehicle(stations:any,id:string) {
    return this.http.put(`${this.SERVER_URL}/vehicles/${id}`,stations);
  }

  deleteVehicle(id:string) {
    return this.http.delete(`${this.SERVER_URL}/vehicles/${id}`);
  }
}
