import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  iduser: any;
  formEditarUsuario: FormGroup;
  usuarioDb: any;
  usuarioView: any;
  editResp: any;

  constructor(private activa: ActivatedRoute, private servicesUsuario: UsuariosService) { 
    this.activa.params.subscribe(params => {
      this.iduser = decodeURI(params['iduser']);
    });

    this.formEditarUsuario = new FormGroup({
      'nombre': new FormControl('',Validators.minLength(6)),
      'password': new FormControl('',Validators.minLength(6)),
      'correo': new FormControl('',Validators.minLength(6)),
    })
  }

  ngOnInit(): void {
    this.dataUsuario();
  }

  dataUsuario(){
    this.servicesUsuario.getUsuarioUno(this.iduser)
    .subscribe(data =>{
      this.usuarioDb = data;
      this.usuarioView = this.usuarioDb.items;
      this.formEditarUsuario.controls?.['nombre'].setValue(this.usuarioView[0].nombre);
      this.formEditarUsuario.controls?.['correo'].setValue(this.usuarioView[0].correo);
    });
    }

  guardarEditarUsuario(){
    this.servicesUsuario.editarusuario(this.iduser, this.formEditarUsuario)
    .subscribe(data => {
      this.editResp = data;
      if(this.editResp.items[0].error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.editResp.items[0].error,
        });
      }else{
        Swal.fire({
          title: 'todo salio bien',
          text: this.editResp.items[0].mensaje,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok!'
        });
        this.dataUsuario();
      }
    }); 
  }

}
