import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ProfileService {
  SERVER_URL = "https://ttcs-booking-bus.herokuapp.com/api/v1";

  constructor(private http: HttpClient) {}

  saveProfile(profile: any) {
    return this.http.post(`${this.SERVER_URL}/users/update`, profile);
  }

  savePassword(password: any) {
    return this.http.post(`${this.SERVER_URL}/update/password`, password);
  }

  resetPassword(password: any) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.SERVER_URL}/reset/${token}`, password);
  }
}
