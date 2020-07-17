import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {
  email: string;
  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
  }
  reset()
  {
    if(this.email==undefined||this.email==null||this.email==""){
      alert('Ingresar su correo electrónico.');
    }else{
      this.authService.resetPassword(this.email);
      alert('Revisar su correo para restablecer la contraseña.');
      this.router.navigate(['/home']);
    }
    
  }

}
