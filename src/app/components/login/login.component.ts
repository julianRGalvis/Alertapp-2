import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  loginResp: any;

  constructor(private loginServicio: LoginService, private ruta:Router) { 
    this.formLogin = new FormGroup({
      'usuario': new FormControl('',[Validators.required,Validators.minLength(6)]),
      'contrasena': new FormControl('',[Validators.required,Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
  }

  validar( ){

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor.'
    });
    Swal.hideLoading();

    this.loginServicio.sendValidate(this.formLogin)
    .subscribe((data: any) => {
      this.loginResp = data;
      console.log(this.loginResp);
        if(this.loginResp.items[0].codigo == 20){
          this.ruta.navigateByUrl("/dashboard");
          Swal.close();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: this.loginResp.items[0].error
          })
        }

    });
  }
  
  
}
