import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  formGroup: FormGroup; 
  mensaje:string;
  mensajeconfir:string;
  constructor(
    private authSvc: AuthService, 
    private router: Router,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController) {
    this.crearvalidaciones();
  }

  ngOnInit() {
  }

  //Crear validaciones
  crearvalidaciones(){
    const emailControl = new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(10),
        Validators.maxLength(40)

    ]));
    this.formGroup = this.formBuilder.group({emailControl });
  }

  //Mensaje de alert de error
  async mensajeerror() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: this.mensaje,
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  //Mensaje de alert de confirmacion
  async mensajeconfirmacion() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: this.mensajeconfir,
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            this.redireccionar();
          }
        }
      ]
    });
    await alert.present();
  }

  async onResetPassword(email) {
    try {
      await this.authSvc.resetPassword(email.value);
      this.mensajeconfir="Se envió un mensaje para la recuperación de contraseña al correo ingresado.";
      this.mensajeconfirmacion();
      
    } catch (error) {
      if(error['message']=="There is no user record corresponding to this identifier. The user may have been deleted."){
        this.mensaje="El usuario ingresado no se encuentra registrado o fue eliminado.";
        this.mensajeerror();
      }
    }
  }

  async redireccionar(){
    this.router.navigate(['/login']);
  }

}
