import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { //CanActivate es una interfaz para decidir si una ruta puede ser activada o no

  constructor(private authService : AuthService, private router : Router)  {}

  //Método que según si el usuario está logeado provee acceso o no
  canActivate() : boolean {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
