import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SERVER_URL } from "src/app/app.constants";
import { Customers } from "./list-user/list-user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(page?: number) {
    return this.http.get(`${SERVER_URL}/users?pageNumber=${page}`);
  }

  createUser(users: any) {
    return this.http.post(`${SERVER_URL}/auth/signup`, users, {
      observe: "response",
    });
  }

  updateUser(users: any, id: string) {
    return this.http.put(`${SERVER_URL}/users/${id}`, users, {
      observe: "response",
    });
  }

  deleteUser(id: string) {
    return this.http.delete(`${SERVER_URL}/users/${id}`);
  }

  searchUser(user: any) {
    return this.http.post(`${SERVER_URL}/search/users`, { name: user.value });
  }
}
