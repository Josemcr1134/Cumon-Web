import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public get bulkHeaders() {
    return {
      headers: {
        'Content-type': 'text/csv'
      }
    }
  };
  constructor(private http: HttpClient, private authSvc: AuthService) { }

  getOrders(data: {}) {
    const url = `${this.authSvc.baseUrl}/order/read`;
    return this.http.post(url, data, this.authSvc.header);
  };

  createOrder(data: {}) {
    const url = `${this.authSvc.baseUrl}/order`;
    return this.http.post(url, data, this.authSvc.header);
  };

  getOrderById(id: number) {
    const url = `${this.authSvc.baseUrl}/order/${id}`;
    return this.http.get(url, this.authSvc.header);
  };

  assignDeliveryToOrder(data: {}, orderId: number) {
    const url = `${this.authSvc.baseUrl}/order/${orderId}/assign-messenger`;
    return this.http.patch(url, data, this.authSvc.header);
  };


  // BULK ORDERS UPLOAD

  createBulkOrder() {
    const url = `${this.authSvc.baseUrl}/bulk-uploads`;
    return this.http.post(url, {}, this.authSvc.header)
  };



  sendBulkFile(presignedUrl: string, file: File): Observable<HttpEvent<any>> {
    // Importante: el Content-Type debe coincidir con el que se usó al firmar (text/csv)
    const headers = new HttpHeaders({ 'Content-Type': 'text/csv' });

    // Usamos HttpRequest para poder trackear progreso
    const req = new HttpRequest('PUT', presignedUrl, file, {
      headers,
      reportProgress: true,
      responseType: 'text'  // S3 suele responder sin JSON
    });

    return this.http.request(req);
  }

  getBulksResults(id: any) {
    const url = `${this.authSvc.baseUrl}/bulk_order?request_order_id=${id}`;
    return this.http.get(url, this.authSvc.header);
  };

  getBulksProcess(page: number, pageSize: number, startDate: string, endDate: string, status: string | null) {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page);
    }
    if (pageSize) {
      params = params.set('pageSize', pageSize);
    }

    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
    if (status !== null) {
      params = params.set('status', status);
    }

    const url = `${this.authSvc.baseUrl}/bulk-uploads/read`;
    return this.http.get(url, { headers: this.authSvc.header.headers, params });
  };
}
