import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //url = 'http://127.0.0.1/backend/index.php';

  constructor(private http:HttpClient) { }

  sendValidate(formulario:any){
    return this.http.post('backend/index.php/users/validate',{
      'usuario': formulario.controls.usuario.value,
      'password': formulario.controls.contrasena.value
    })
  }
}
