import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {


  formNuevoUsuario: FormGroup;
  resp: any;

  perfilesDb: any;
  perfilesView: any;
  constructor(private userService: UsuariosService, private activa: ActivatedRoute, private rutas: Router,) { 
    this.formNuevoUsuario = new FormGroup({
      'nombre': new FormControl('',Validators.minLength(6)),
      'password': new FormControl('',Validators.minLength(6)),
      'correo': new FormControl('',Validators.minLength(6)),
    })
  }

  ngOnInit(): void {
  }

  guardarUsuario(){
    this.userService.GuardarUsurarioNuevo(this.formNuevoUsuario)
    .subscribe((data: any) => {
      this.resp = data;
      console.log(this.resp.items[0]);
      if(this.resp.items[0].resultado){
        Swal.fire({
          title: 'Todo salio Bien',
          text: this.resp.items[0].resultado,
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          console.log(result);
          this.rutas.navigateByUrl('/usuarios');
        })
      }else if(this.resp.items[0].error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.resp.items[0].resultado
        })
      }
    });
  }
}
