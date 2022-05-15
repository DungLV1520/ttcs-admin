import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ProfileService {
  SERVER_URL = "https://ttcs-booking.herokuapp.com/api/v1";

  constructor(private http: HttpClient) {}

  updateProfile(profile: any) {
    console.log(profile);
    console.log("aaa");

    return this.http.put(`${this.SERVER_URL}/users/update`, profile);
  }

  updatePassword(password: any) {
    return this.http.put(`${this.SERVER_URL}/users/update/password`, password);
  }

  resetPassword(password: any) {
    const token = localStorage.getItem("token");
    return this.http.post(`${this.SERVER_URL}/reset/${token}`, password);
  }
}
