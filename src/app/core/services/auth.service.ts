import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl: string = environment.baseUrl;
  public get header() {
    return {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
      }
    }
  };

  constructor(private http: HttpClient) { }

  // AUTHENTICATION OPERATIONS

  login(data: {}) {
    const url = `${this.baseUrl}/auth`;
    return this.http.post(url, data);
  };

  refreshToken(data: {}) {
    const url = `${this.baseUrl}/auth/refresh-token`;
    return this.http.post(url, data);
  };


}
