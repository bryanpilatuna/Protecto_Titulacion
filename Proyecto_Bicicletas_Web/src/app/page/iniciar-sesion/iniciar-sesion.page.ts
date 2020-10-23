import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {
  formGroup: FormGroup; // declare it here
  passwordTypeInput = 'password';
  id: string;
  mensaje:string;
  image:any;
  constructor(
    private authSvc: AuthService, 
    private router: Router,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController
  ) {
    this.crearvalidaciones();
   }

  ngOnInit() {
  }

  /*async presentPrompt() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Recuperar contraseña',
      message: this.mensaje,
      inputs: [
        {
          name: 'username',
          placeholder: 'Correo',
          type: 'email'
        }
      ],
      buttons: [
       {
          text: 'Enviar',
          handler: data => {
            console.log(data.username);
          }
        }
      ]
    });

    await alert.present();
  }*/

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
 
  
  //Crear validaciones para el form 
  crearvalidaciones(){
    const emailControl = new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(10),
        Validators.maxLength(40)

    ]));
    const passwordControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
        Validators.maxLength(40)
    ]));
    this.formGroup = this.formBuilder.group({emailControl,passwordControl });
  }

  //Login con un registro
  async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }else{
        if(this.authSvc.errores=="The password is invalid or the user does not have a password."){
          this.mensaje="La contraseña es incorrecta.";
          this.mensajeerror();
        }else if(this.authSvc.errores=="There is no user record corresponding to this identifier. The user may have been deleted."){
          this.mensaje="El usuario no se encuentra registrado.";
          this.mensajeerror();
        }
      }
    }catch (error) {
      console.log('Error->', error['message']);
    }
  }

  //Login a través de Google
  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }else{
        console.log(this.authSvc.errores);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  //Redireccionar si el correo es verificado
  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['menu']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }

  //Habilitar y deshabilitar la visualización del password
  showPassword() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
  }

}
