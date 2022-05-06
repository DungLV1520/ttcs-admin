import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Customers } from "./customers/customers.model";

@Injectable({ providedIn: "root" })
export class CompanyService {
   SERVER_URL = "https://ttcs-booking-bus.herokuapp.com/api/v1";

  constructor(private http: HttpClient) {
  }

  getCompany() {
    return this.http.get(`${this.SERVER_URL}/companies/all`);
  }


  createCompany(companies:any) {
    return this.http.post(`${this.SERVER_URL}/companies`,companies);
  }


  updateCompany(companies:Customers,id:string) {
    return this.http.put(`${this.SERVER_URL}/companies/${id}`,companies);
  }


  deleteCompany(id:string) {
    return this.http.get(`${this.SERVER_URL}/companies/${id}`);
  }
}
