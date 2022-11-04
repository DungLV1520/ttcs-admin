import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SERVER_URL } from "src/app/app.constants";

@Injectable({ providedIn: "root" })
export class JobService {
  constructor(private http: HttpClient) {}

  getJob(page?: number) {
    return this.http.get(
      `${SERVER_URL}/jobs/findByRecruiter?pageNumber=${page}`
    );
  }

  createJob(req: any) {
    return this.http.post(`${SERVER_URL}/jobs`, req);
  }

  updateJob(req: any, id: string) {
    return this.http.put(`${SERVER_URL}/jobs/${id}`, req);
  }

  deleteJob(id: string) {
    return this.http.delete(`${SERVER_URL}/jobs/${id}`);
  }

  searchJob(req: any) {
    return this.http.post(`${SERVER_URL}/search/jobs`, req);
  }
}
