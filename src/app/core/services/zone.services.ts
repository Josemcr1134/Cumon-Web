import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Zone } from '../models/zone.model';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private apiUrl = 'api/zones'; // Ajusta según tu API
  public data: Zone[] = []

  constructor(private http: HttpClient, private authSvc: AuthService) { }

  getZones(page: number, pageSize: number, search: string) {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page);
    }
    if (pageSize) {
      params = params.set('pageSize', pageSize);
    }

    if (search) {
      params = params.set('search', search);
    }

    const url = `${this.authSvc.baseUrl}/geographical-area/read`;
    return this.http.get(url, { headers: this.authSvc.header.headers, params });
  };

  getZoneById(zoneId: string): Observable<Zone[]> {
    const url = `${this.authSvc.baseUrl}/geographical-area/${zoneId}`
    return this.http.get<Zone[]>(url, this.authSvc.header);
  };

  createZone(zone: Zone): Observable<Zone> {
    const url = `${this.authSvc.baseUrl}/geographical-area`
    return this.http.post<Zone>(url, zone, this.authSvc.header);
  };

  updateZone(zone: Zone): Observable<Zone> {
    const url = `${this.authSvc.baseUrl}/geographical-area`;
    return this.http.put<Zone>(url, zone, this.authSvc.header);
  }

  deletePoint(id: string): Observable<void> {
    const url = `${this.authSvc.baseUrl}/geographic-point`;
    return this.http.delete<void>(`${url}/${id}`, this.authSvc.header);
  };

  checkZoneExists(name: string, city: string) {
    return true
  }


  // En tu zone.service.ts
  validateAddressInZone(address: string, zoneId: string): Observable<boolean> {
    return this.getZoneById(zoneId).pipe(
      switchMap((zone: any) => {
        if (!zone) return of(false);

        return this.geocodeAddress(address).pipe(
          map(point => {
            if (!point) return false;
            return this.isPointInPolygon(point, zone.polygonCoordinates);
          })
        );
      })
    );
  }

  private geocodeAddress(address: string): Observable<{ lat: number, lng: number } | null> {
    // Implementar geocodificación con Google Maps API u otro servicio
    // Ejemplo simplificado:
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=TU_API_KEY`).pipe(
      map(response => {
        if (response.results && response.results.length > 0) {
          const location = response.results[0].geometry.location;
          return { lat: location.lat, lng: location.lng };
        }
        return null;
      })
    );
  }

  // Algoritmo para verificar si un punto está dentro de un polígono
  private isPointInPolygon(point: { lat: number, lng: number }, polygon: [number, number][]): boolean {
    // Implementación del algoritmo ray-casting
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1];
      const xj = polygon[j][0], yj = polygon[j][1];

      const intersect = ((yi > point.lat) !== (yj > point.lat))
        && (point.lng < (xj - xi) * (point.lat - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }
}
