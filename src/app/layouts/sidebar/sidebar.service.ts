import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ProfileService {
  SERVER_URL = "https://ttcs-booking.herokuapp.com/api/v1";
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${this.SERVER_URL}/users/account`);
  }
}
