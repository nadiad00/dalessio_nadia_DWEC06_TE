import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public username : string = '';
  public password : string = '';
  public error : string = '';
  public autenticado : boolean = false;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.autenticado = this.authService.isAuthenticated();
  }

  login() : void {
    const success = this.authService.login(this.username, this.password);

    if(success) {
      this.router.navigate(['home']);
    } else {
      this.error = 'Usuario o contraseña incorrecta'
    }
  }

  logout() : void {
    this.authService.logout();
  }

}
