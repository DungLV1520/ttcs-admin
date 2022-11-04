import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SERVER_URL } from "src/app/app.constants";

@Injectable({ providedIn: "root" })
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${SERVER_URL}/users/account`);
  }
}
