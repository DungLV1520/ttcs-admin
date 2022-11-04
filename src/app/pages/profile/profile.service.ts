import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SERVER_URL } from "src/app/app.constants";

@Injectable({ providedIn: "root" })
export class ProfileService {
  constructor(private http: HttpClient) {}

  updateProfile(profile: any) {
    return this.http.put(`${SERVER_URL}/users/update`, profile);
  }

  updatePassword(password: any) {
    return this.http.put(`${SERVER_URL}/users/update/password`, password);
  }

  resetPassword(password: any) {
    const token = localStorage.getItem("token");
    return this.http.post(`${SERVER_URL}/reset/${token}`, password);
  }
}
