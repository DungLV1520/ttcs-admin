import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { SERVER_URL } from "src/app/app.constants";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class SideService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<HttpResponse<any>> {
    return this.http.get(`${SERVER_URL}/users/profile`, {
      observe: "response",
    });
  }
}
