import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  private apiV1 = "/api/v1";

  constructor(private http: HttpClient) { }

  login(body: any) {
    const fullUrl = this.baseUrl + this.apiV1 + "/auth/login"
    return this.http.post(fullUrl, body);
  }

  getUsers(args: any) {
    const fullUrl = this.baseUrl + this.apiV1 + "/user"

    const headers = this.getHeaders();

    return this.http.get(fullUrl, { headers, params: args });
  }

  getUserById(id: any) {
    const fullUrl = this.baseUrl + this.apiV1 + "/user/" + id

    const headers = this.getHeaders();

    return this.http.get(fullUrl, { headers });
  }

  getAttendanceByRange(body: any, args: any) {
    const fullUrl = this.baseUrl + this.apiV1 + "/attendance/by-range"

    const headers = this.getHeaders();

    return this.http.post(fullUrl, body, { headers, params: args });
  }

  takeAttendance(body: any) {
    const fullUrl = this.baseUrl + this.apiV1 + "/attendance/take-records"

    const headers = this.getHeaders();

    return this.http.post(fullUrl, body, { headers });
  }

  updateUser(body: any) {
    const fullUrl = this.baseUrl + this.apiV1 + "/user"

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(fullUrl, body, { headers });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
  }

  private getToken() {
    return localStorage.getItem('token');
  }
}
