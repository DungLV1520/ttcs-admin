import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SERVER_URL } from "src/app/app.constants";

@Injectable({ providedIn: "root" })
export class TicketService {
  constructor(private http: HttpClient) {}

  getTicket(page?: number) {
    return this.http.get(`${SERVER_URL}/tickets/all?pageNumber=${page}`);
  }

  deleteTicket(id: string) {
    return this.http.delete(`${SERVER_URL}/tickets/${id}`);
  }

  searchTicket(vehicle: any) {
    return this.http.post(`${SERVER_URL}/tickets/search`, vehicle);
  }
}
