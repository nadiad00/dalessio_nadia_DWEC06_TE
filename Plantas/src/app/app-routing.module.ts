import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { CrearComponent } from './crear/crear.component';
import { AuthGuard } from './guards/auth.guard';
import { ModificarComponent } from './modificar/modificar.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'aniadir-planta', component: CrearComponent, canActivate: [AuthGuard]}, //Ruta protegida
  {path: 'modificar-planta', component: ModificarComponent, canActivate: [AuthGuard]}, //Ruta protegida
  {path: '**', component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
