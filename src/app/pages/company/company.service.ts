import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Customers } from "./customers/customers.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CompanyService {
  SERVER_URL = "https://ttcs-booking.herokuapp.com/api/v1";

  constructor(private http: HttpClient) {}

  getCompany(page?: number): Observable<HttpResponse<any>> {
    return this.http.get(
      `${this.SERVER_URL}/companies/all?pageNumber=${page}`,
      {
        observe: "response",
      }
    );
  }

  createCompany(companies: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.SERVER_URL}/companies`, companies, {
      observe: "response",
      responseType: "blob",
    });
  }

  updateCompany(companies: any, id: string): Observable<HttpResponse<any>> {
    return this.http.put(`${this.SERVER_URL}/companies/${id}`, companies, {
      observe: "response",
      responseType: "blob",
    });
  }

  deleteCompany(id: string) {
    return this.http.delete(`${this.SERVER_URL}/companies/${id}`);
  }

  searchCompany(company: any) {
    return this.http.post(`${this.SERVER_URL}/companies/search`, company);
  }
}
