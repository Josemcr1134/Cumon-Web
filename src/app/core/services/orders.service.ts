import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

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


  sendBulkFile(url: string, data: FormData) {
    return this.http.put(url, data, this.authSvc.header);
  };

  getBulksResults(id: any) {
    const url = `${this.authSvc.baseUrl}/bulk_orders/request_order_id=${id}`;
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
