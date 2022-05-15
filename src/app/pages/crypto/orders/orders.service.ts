import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class SeatService {
  SERVER_URL = "https://ttcs-booking.herokuapp.com/api/v1";

  constructor(private http: HttpClient) {}

  getSeat(page?: number) {
    return this.http.get(`${this.SERVER_URL}/seats/all?pageNumber=${page}`);
  }

  searchSeat(seat: any) {
    return this.http.post(`${this.SERVER_URL}/seats/search`, seat);
  }
}
