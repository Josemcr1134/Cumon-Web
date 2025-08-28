export interface Zone {
  id?: string;
  name: string;
  city: string;
  description: string;
  geographicPoints: any[]; // Coordenadas para el polígono en el mapa
}
