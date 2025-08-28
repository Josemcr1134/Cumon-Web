import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient, private authSvc: AuthService) { }

  getDocumentTypes() {
    const url = `${this.authSvc.baseUrl}/document-type/read-all`;
    return this.http.get(url, this.authSvc.header);
  };
}
