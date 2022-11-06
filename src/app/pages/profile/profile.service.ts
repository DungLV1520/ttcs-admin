import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { SERVER_URL } from "src/app/app.constants";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<HttpResponse<any>> {
    return this.http.get(`${SERVER_URL}/users/profile`, {
      observe: "response",
    });
  }
  updateProfile(profile: any) {
    return this.http.put(`${SERVER_URL}/users/update`, profile);
  }

  updatePassword(password: any) {
    return this.http.put(`${SERVER_URL}/users/update/password`, password);
  }

  resetPassword(password: string, resetToken: string) {
    return this.http.post(`${SERVER_URL}/auth/reset/${resetToken}`, password);
  }
}
