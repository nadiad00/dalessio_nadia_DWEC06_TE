import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlantasService } from '../services/plantas.service';
import { Planta } from '../models/planta';

@Component({
  selector: 'app-crear',
  standalone: false,
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent {

  public planta : Planta = {
    id: 0,
    nombreComun: '',
    nombreCientifico: '',
    imagenUrl: ''
  };
  maxId : number = 3000;

  constructor(private plantasService : PlantasService) {}

  enviarFormulario(formulario : NgForm) : void {
    this.plantasService.crearPlanta(this.planta).subscribe({
      next: () => {
        alert('Nueva planta añadida correctamente');

        if(this.planta.id > this.maxId) {
          this.maxId = this.planta.id;
        }

        formulario.resetForm();

      },
      error: err => {
        console.error('Error al enviar la planta: ', err);
        alert('Error al añadir una nueva planta');
      }
    });
  }
}
