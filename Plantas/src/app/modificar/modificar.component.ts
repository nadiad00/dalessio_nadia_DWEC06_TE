import { Component } from '@angular/core';
import { PlantasService } from '../services/plantas.service';
import { Planta } from '../models/planta';

@Component({
  selector: 'app-modificar',
  standalone: false,
  templateUrl: './modificar.component.html',
  styleUrl: './modificar.component.css'
})
export class ModificarComponent {

  planta : Planta = {
    id: 0,
    nombreComun: '',
    nombreCientifico: '',
    imagenUrl: ''
  };
  plantaCargada : boolean = false;

  constructor(private plantasService : PlantasService) {}

  buscarPlanta() : void{
    this.plantasService.obtenerPlanta(this.planta.id).subscribe({
      next: (planta) => {
        this.planta = planta;
        this.plantaCargada = true;
      },
      error: () => {
        alert('No se ha encontrado una planta con ese ID.');
        this.plantaCargada  = false;
      }
    });
  }

  modificarPlanta() : void {
    this.plantasService.modificarPlanta(this.planta).subscribe({
      next: () => {
        alert('Planta modificada correctamente');
      },
      error: () => {
        alert('Error al modificar la planta');
      }
    });
  }

  borrarPlanta() : void {
    this.plantasService.borrarPlanta(this.planta.id).subscribe({
      next: () => {
        alert('Planta borrada correctamente');
        this.plantaCargada = false;
      },
      error: () => {
        alert('Error al borrar la planta');
      }
    });
  }

}
