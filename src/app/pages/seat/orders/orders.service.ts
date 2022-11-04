import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SERVER_URL } from "src/app/app.constants";

@Injectable({ providedIn: "root" })
export class SeatService {
  constructor(private http: HttpClient) {}

  getSeat(page?: number) {
    return this.http.get(`${SERVER_URL}/seats/all?pageNumber=${page}`);
  }

  searchSeat(seat: any) {
    return this.http.post(`${SERVER_URL}/seats/search`, seat);
  }
}
