import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root' //Esto hace que el servicio está disponible en toda la app sin tener que añadirlo en el 'providers' del componente que lo va a usar
})
export class AuthService {
  private autenticado : boolean = false;

  constructor(private router : Router) {
    this.autenticado = !!localStorage.getItem('token'); //Los dos puntos exclamativos convierten directamente la respuesta de localStorage.getItem('token') en un boleano
  }

  //Método para hacer login simulado
  login(usuario : string, contrasena : string) : boolean {

    //Credenciales simuladas
    if(usuario === 'admin' && contrasena === 'admin') {
      localStorage.setItem('token', 'token-simulado'); //Da el valor token-simulado a token
      this.autenticado = true;
      return true;
    }

    return false;
  }

  //Método para hacer logout si ya se está autenticado
  logout() {
    localStorage.removeItem('token');
    this.autenticado = false;
    this.router.navigate(['/']); //Lleva a la página de login al hacer logout
  }

  //Método para saber si se está autenticado o no
  isAuthenticated() : boolean {
    return this.autenticado;
  }
 }
