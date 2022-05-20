import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class TicketService {
  SERVER_URL = "https://ttcs-booking.herokuapp.com/api/v1";

  constructor(private http: HttpClient) {}

  getTicket(page?: number) {
    return this.http.get(`${this.SERVER_URL}/tickets/all?pageNumber=${page}`);
  }

  deleteTicket(id: string) {
    return this.http.delete(`${this.SERVER_URL}/tickets/${id}`);
  }

  searchTicket(vehicle: any) {
    return this.http.post(`${this.SERVER_URL}/tickets/search`, vehicle);
  }
}
