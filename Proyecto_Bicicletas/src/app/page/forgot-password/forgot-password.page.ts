import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  formGroup: FormGroup; 
  constructor(private authSvc: AuthService, private router: Router,public formBuilder: FormBuilder) {
    this.crearvalidaciones();
  }

  ngOnInit() {
  }

  crearvalidaciones(){
    // Campo Contraseña
    const emailControl = new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(10),
        Validators.maxLength(40)

    ]));
    // Añado Propiedades al Form
    this.formGroup = this.formBuilder.group({emailControl });
  }

  async onResetPassword(email) {
    try {
      await this.authSvc.resetPassword(email.value);
      alert('Se envio un mensaje de recuperacion de contraseña a su correo');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error->', error);
    }
  }

}
