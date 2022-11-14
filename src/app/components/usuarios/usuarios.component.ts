import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuariosDb: any;
  usuariosView: any;
  resp: any;
  constructor(private servicesUsuario: UsuariosService, private usuarioRouter:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getlistUser();
  }

  eliminar(id:any){
    Swal.fire({
      title: 'Esta seguro?',
      text: "Desea Eliminar este usuario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicesUsuario.deleteUsuario(id)
        .subscribe((deleteResp: any) =>{
          this.resp = deleteResp;
          if(this.resp.items[0].error){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: this.resp.items[0].error,
            });
          }else{
            Swal.fire({
              title: 'todo salio bien',
              text: this.resp.items[0].mensaje,
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok!'
            });
            this.getlistUser();
          }
        });
      }
    });
  }

  getlistUser(){
    this.servicesUsuario.getlistUserAll()
    .subscribe(data =>{
      this.usuariosDb = data;
      this.usuariosView = this.usuariosDb.items;
    });
  }

  editarusuario(encry: any){
    let url, url2;
    url = this.usuarioRouter.createUrlTree(['/usuarios/editar-usuario', encry], { relativeTo: this.route });
    this.usuarioRouter.navigateByUrl(url);
  }


}
