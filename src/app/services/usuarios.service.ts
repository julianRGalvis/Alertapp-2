import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = 'http://localhost/phpmyadmin/index.php';
  constructor(private http:HttpClient) { }


  GuardarUsurarioNuevo(formulario:any){

    return this.http.post(`${this.url}/users/guardarusuario`,{
      "nombre": formulario.controls.nombre.value,
      "identificacion": formulario.controls.identificacion.value,
      "telefono": formulario.controls.telefono.value,
      "celular": formulario.controls.celular.value,
      "email": formulario.controls.email.value,
      "perfil": formulario.controls.perfil.value,
    });
  }

  getPerfiles(){
    return this.http.post(`${this.url}/users/getperfiles`,{
    });
  }
}
