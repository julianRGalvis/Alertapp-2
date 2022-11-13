import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { AgregarUsuarioComponent } from "./components/usuarios/agregar-usuario.component";
import { UsuariosComponent } from "./components/usuarios/usuarios.component";

export const APP_ROUTES: Routes = [

    {path:'login', component: LoginComponent},
    {path:'dashboard', component: DashboardComponent},
    {path:'usuarios', component: UsuariosComponent},
    {path:'agregar-usuario', component: AgregarUsuarioComponent},

  
  
    {path: "", pathMatch:'full', redirectTo:'login'},
    {path: '**', pathMatch:'full', redirectTo:'login'}
  ];