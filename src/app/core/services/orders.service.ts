import { HttpClient } from '@angular/common/http';
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
}
