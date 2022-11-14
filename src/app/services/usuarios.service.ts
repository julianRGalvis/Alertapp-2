import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  //url = 'http://localhost/phpmyadmin/index.php';
  constructor(private http:HttpClient) { }

  deleteUsuario(id:any){
    return this.http.post('backend/index.php/users/deleteuser',{
      'id': id
    })
  }

  editarusuario(id:any, formulario:any){
    return this.http.post('backend/index.php/users/editarusuario',{
      "nombre": formulario.controls.nombre.value,
      "correo": formulario.controls.correo.value,
      'password': formulario.controls.password.value,
      "id": id
    });
  }

  getUsuarioUno(id:any){
    return this.http.post('backend/index.php/users/getusuariouno',{
      'id':id
    });
  }


  GuardarUsurarioNuevo(formulario:any){

    return this.http.post('backend/index.php/users/crearusuario',{
      "nombre": formulario.controls.nombre.value,
      "password": formulario.controls.password.value,
      "correo": formulario.controls.correo.value,
    });
  }

  getlistUserAll(){
    return this.http.post('backend/index.php/users/getusuariosall',{ 
    });
  }
}
