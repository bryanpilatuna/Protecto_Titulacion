import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  onSubmitLogin()
  {
    if(this.email==undefined||this.password==undefined||this.email==null||this.password==null||this.email==""||this.password==""){
      alert('Ingresar todos los campos.');
    }else{
      this.authService.login(this.email, this.password).then( res =>{
        this.router.navigate(['/home']);
      }).catch(err => alert('Datos incorrectos o no existe el usuario.'))
    }
  }

  loginGoogle(){

  }

}
