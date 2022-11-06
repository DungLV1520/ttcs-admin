import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SERVER_URL } from "src/app/app.constants";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(page?: number): Observable<HttpResponse<any>> {
    return this.http.get(`${SERVER_URL}/users?pageNumber=${page}`, {
      observe: "response",
    });
  }

  getDashboard(): Observable<HttpResponse<any>> {
    return this.http.get(`${SERVER_URL}/users/dashboard`, {
      observe: "response",
    });
  }

  createUser(users: any): Observable<HttpResponse<any>> {
    return this.http.post(`${SERVER_URL}/auth/signup`, users, {
      observe: "response",
    });
  }

  updateUser(users: any, id: string): Observable<HttpResponse<any>> {
    return this.http.put(`${SERVER_URL}/users/${id}`, users, {
      observe: "response",
    });
  }

  deleteUser(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${SERVER_URL}/users/${id}`, {
      observe: "response",
    });
  }

  searchUser(user: any): Observable<HttpResponse<any>> {
    return this.http.post(
      `${SERVER_URL}/search/users`,
      { name: user.value },
      {
        observe: "response",
      }
    );
  }
}
