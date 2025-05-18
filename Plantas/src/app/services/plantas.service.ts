import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Planta } from "../models/planta";

@Injectable({
  providedIn: 'root'
})
export class PlantasService {

  private apiKey = '?key=sk-eji8682915560d77a10519'; //Se que no es seguro tener la API Key así
  private speciesUrl = `https://perenual.com/api/species-list${this.apiKey}`;
  private plantUrl = 'https://perenual.com/api/v2/species/details/';
  private mockUrl = 'https://dwec06.free.beeceptor.com';

  constructor(private http : HttpClient) {}

  //Método para obtener todas las plantas (con o sin filtros y busqueda)
  getPlantas(page : number = 1, filtro : string = '', busqueda : string = '') : Observable<Planta[]> {

    //Si ha sidos seleccionado un filtro le añade su valor a la url de la petición
    if(filtro) {
      this.speciesUrl += `&${filtro}=1`;
    } else {
      this.speciesUrl = `https://perenual.com/api/species-list${this.apiKey}`;
    }

    //Si se está buscando algo le añade su valor a la url de la petición
    if(busqueda) {
      this.speciesUrl += `&q=${busqueda}`;
    }

    return this.http.get<any>(`${this.speciesUrl}&page=${page}`).pipe( //pipe transforma los datos antes de que lleguen al subscribe()
      map(response => { //mapea en un array de objetos Planta
        return response.data.map((planta : any) => ({ //mapea los datos de la respuesta en un objeto Planta
          id: planta.id,
          nombreComun: planta.common_name,
          nombreCientifico: planta.scientific_name,
          imagenUrl: planta.default_image?.thumbnail
        }) as Planta);
      })
    );
  }

  //Método para crear un nuevo objeto Planta
  crearPlanta(planta : Planta) : Observable<any> {
    return this.http.post(`${this.mockUrl}/crear`, planta);
  }

  //Método para obtener una planta especifica para poder luego modificar o borrar
  obtenerPlanta(id : number) : Observable<Planta> {
    return this.http.get<Planta>(`${this.plantUrl}${id}${this.apiKey}`).pipe(
      map((planta : any) => {
        return {
        id: planta.id,
        nombreComun: planta.common_name,
        nombreCientifico: planta.scientific_name,
        imagenUrl: planta.default_image?.thumbnail
        }  as Planta;
      })
    );
  }

  //Método para hacer una petición PUT
  modificarPlanta(planta : Planta) : Observable<any> {
    return this.http.put(`${this.mockUrl}/modificar`, planta);
  }

  //Método para hacer una petición DELETE
  borrarPlanta(id : number) : Observable<any> {
    return this.http.delete(`${this.mockUrl}/borrar`);
  }

  //Método para obtener plantas sólo según el filtro (para el gráfico)
  obtenerPlantasPorFiltro(filtro : string) : Observable<any>{
    return this.http.get<any>(`${this.speciesUrl}&${filtro}=1`).pipe(
      map(response => response.data)
    );
  }

}
