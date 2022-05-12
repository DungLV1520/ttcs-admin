import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Customers } from "./customers/customers.model";

@Injectable({ providedIn: "root" })
export class CompanyService {
   SERVER_URL = "https://ttcs-booking-bus.herokuapp.com/api/v1";

  constructor(private http: HttpClient) {
  }

  getCompany(page?:number) {
    return this.http.get(`${this.SERVER_URL}/companies/all?pageNumber=${page}`);
  }


  createCompany(companies:any) {
    return this.http.post(`${this.SERVER_URL}/companies`,companies);
  }


  updateCompany(companies:Customers,id:string) {
    return this.http.put(`${this.SERVER_URL}/companies/${id}`,companies);
  }

  deleteCompany(id:string) {
    return this.http.delete(`${this.SERVER_URL}/companies/${id}`);
  }


  searchCompany(company:any) {
    return this.http.post(`${this.SERVER_URL}/companies/search`,company);
  }
}
