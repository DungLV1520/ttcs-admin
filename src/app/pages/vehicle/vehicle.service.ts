import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class VehicleService {
  SERVER_URL = "https://ttcs-booking.herokuapp.com/api/v1";

  constructor(private http: HttpClient) {}

  getVehicle(page?: number) {
    return this.http.get(`${this.SERVER_URL}/vehicles/all?pageNumber=${page}`);
  }

  getVehicleSeatID(id?: string) {
    return this.http.get(`${this.SERVER_URL}/seats/${id}`);
  }

  creatVehicle(vehicles: any) {
    return this.http.post(`${this.SERVER_URL}/vehicles`, vehicles);
  }

  creatSeat(seat: any) {
    return this.http.post(`${this.SERVER_URL}/seats`, seat);
  }

  updateVehicle(vehicles: any, id: string) {
    return this.http.put(`${this.SERVER_URL}/vehicles/${id}`, vehicles);
  }

  updateSeat(seats: any, id: string) {
    return this.http.put(`${this.SERVER_URL}/seats/${id}`, seats);
  }

  deleteVehicle(id: string) {
    return this.http.delete(`${this.SERVER_URL}/vehicles/${id}`);
  }

  deleteSeat(id: string) {
    return this.http.delete(`${this.SERVER_URL}/seats/${id}`);
  }

  getAllSeat() {
    return this.http.get(`${this.SERVER_URL}/seats/all`);
  }

  getSeat(id: string) {
    return this.http.get(`${this.SERVER_URL}/seats/${id}`);
  }
  searchVehicle(vehicle: any) {
    return this.http.post(`${this.SERVER_URL}/vehicles/search`, vehicle);
  }

  getVehicleByIDCompany(id: any) {
    return this.http.get(`${this.SERVER_URL}/vehicles/getByCompanyId/${id}`);
  }
}
