import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private authSvc: AuthService) { }

  // USERS CRUD OPERATIONS
  getUsers(page: number, pageSize: number, role: number, search: string, status: string) {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page);
    }
    if (pageSize) {
      params = params.set('pageSize', pageSize);
    }
    if (role) {
      params = params.set('role', role);
    }
    if (search) {
      params = params.set('search', search);
    }
    if (status) {
      params = params.set('status', status);
    }

    const url = `${this.authSvc.baseUrl}/user/read`;
    return this.http.get(url, { headers: this.authSvc.header.headers, params });
  };

  createUser(data: {}) {
    const url = `${this.authSvc.baseUrl}/user`;
    return this.http.post(url, data, this.authSvc.header);
  };

  updateUser(data: {}, id: string) {
    const url = `${this.authSvc.baseUrl}/user/${id}`;
    return this.http.put(url, data, this.authSvc.header);
  };

  getUserById(id: string) {
    const url = `${this.authSvc.baseUrl}/user/email/${id}`;
    return this.http.get(url, this.authSvc.header);
  }
}
