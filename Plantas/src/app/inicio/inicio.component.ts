import { Component, OnInit } from '@angular/core';
import { PlantasService } from '../services/plantas.service';
import { Planta } from '../models/planta';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  public plantas : Planta[] = [];
  public filtroSeleccionado : string = '';
  public busqueda : string = '';
  public paginaActual : number = 1;

  constructor(private plantasService : PlantasService) {}

  ngOnInit(): void {
    this.cargarPlantas(this.paginaActual);
  }

  cargarPlantas(pagina : number) {
    this.plantasService.getPlantas(pagina, this.filtroSeleccionado, this.busqueda).subscribe((plantas : Planta[]) => {
      this.plantas = plantas;
      this.paginaActual = pagina;
    });
  }

  filtroCambiar() {
    this.cargarPlantas(this.paginaActual);
  }

  busquedaCambiar() {
    this.cargarPlantas(this.paginaActual);
  }

  paginaSiguiente() : void {
    this.cargarPlantas(this.paginaActual + 1);
  }

  paginaAnterior() : void {
    if(this.paginaActual > 1) {
      this.cargarPlantas(this.paginaActual - 1);
    }
  }

}
