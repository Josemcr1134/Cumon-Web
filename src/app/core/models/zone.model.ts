export interface Zone {
  id?: string;
  name: string;
  city: string;
  polygonCoordinates: [number, number][]; // Coordenadas para el polígono en el mapa
  neighborhoods?: string[]; // Barrios incluidos
  municipalities?: string[]; // Municipios incluidos
}
