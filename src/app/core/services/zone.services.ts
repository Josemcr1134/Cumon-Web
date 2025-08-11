import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Zone } from '../models/zone.model';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private apiUrl = 'api/zones'; // Ajusta según tu API
  public data: Zone[]= [
    {
      "id": "1",
      "name": "Zona Norte",
      "city": "Bogotá",
      "polygonCoordinates": [
        [4.7485, -74.0628],
        [4.7352, -74.0493],
        [4.7219, -74.0655],
        [4.7321, -74.0782],
        [4.7456, -74.0721]
      ],
      "neighborhoods": ["Usaquén", "Chapinero", "Santa Barbara"],
      "municipalities": []
    },
    {
      "id": "2",
      "name": "Distrito Financiero",
      "city": "Buenos Aires",
      "polygonCoordinates": [
        [-34.5955, -58.3733],
        [-34.6032, -58.3821],
        [-34.6108, -58.3714],
        [-34.5991, -58.3647],
        [-34.5924, -58.3692]
      ],
      "neighborhoods": ["San Nicolás", "Retiro"],
      "municipalities": []
    },
    {
      "id": "3",
      "name": "Zona Rosa",
      "city": "Ciudad de México",
      "polygonCoordinates": [
        [19.4268, -99.1719],
        [19.4312, -99.1653],
        [19.4356, -99.1741],
        [19.4283, -99.1807],
        [19.4239, -99.1762]
      ],
      "neighborhoods": ["Juárez"],
      "municipalities": []
    },
    {
      "id": "4",
      "name": "Área Metropolitana",
      "city": "Medellín",
      "polygonCoordinates": [
        [6.2442, -75.5812],
        [6.2517, -75.5738],
        [6.2473, -75.5634],
        [6.2358, -75.5691],
        [6.2389, -75.5786]
      ],
      "neighborhoods": ["El Poblado", "Laureles"],
      "municipalities": ["Envigado", "Itagüí", "Bello"]
    },
    {
      "id": "5",
      "name": "Centro Histórico",
      "city": "Lima",
      "polygonCoordinates": [
        [-12.0464, -77.0428],
        [-12.0512, -77.0361],
        [-12.0587, -77.0433],
        [-12.0539, -77.0495],
        [-12.0471, -77.0452]
      ],
      "neighborhoods": ["Cercado de Lima"],
      "municipalities": []
    },
    {
      "id": "6",
      "name": "Sector Bancario",
      "city": "Santiago",
      "polygonCoordinates": [
        [-33.4372, -70.6506],
        [-33.4419, -70.6438],
        [-33.4483, -70.6517],
        [-33.4436, -70.6585],
        [-33.4378, -70.6531]
      ],
      "neighborhoods": ["Santiago Centro"],
      "municipalities": []
    },
    {
      "id": "7",
      "name": "Zona Esmeralda",
      "city": "Madrid",
      "polygonCoordinates": [
        [40.4667, -3.6889],
        [40.4723, -3.6815],
        [40.4779, -3.6902],
        [40.4713, -3.6976],
        [40.4661, -3.6928]
      ],
      "neighborhoods": ["Chamartín"],
      "municipalities": []
    },
    {
      "id": "8",
      "name": "Distrito Comercial",
      "city": "Miami",
      "polygonCoordinates": [
        [25.7617, -80.1918],
        [25.7683, -80.1844],
        [25.7739, -80.1931],
        [25.7673, -80.2005],
        [25.7611, -80.1957]
      ],
      "neighborhoods": ["Downtown"],
      "municipalities": []
    }
  ]

  constructor(private http: HttpClient) {}

  getZones() {
    return  this.data

  }
  getZoneById(zoneId:string): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.apiUrl);
  }

  createZone(zone: Zone): Observable<Zone> {
    return this.http.post<Zone>(this.apiUrl, zone);
  }

  updateZone(zone: Zone): Observable<Zone> {
    return this.http.put<Zone>(`${this.apiUrl}/${zone.id}`, zone);
  }

  deleteZone(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  checkZoneExists(name: string, city: string) {
    return true
  }


  // En tu zone.service.ts
validateAddressInZone(address: string, zoneId: string): Observable<boolean> {
  return this.getZoneById(zoneId).pipe(
    switchMap((zone:any) => {
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

private geocodeAddress(address: string): Observable<{lat: number, lng: number} | null> {
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
private isPointInPolygon(point: {lat: number, lng: number}, polygon: [number, number][]): boolean {
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
