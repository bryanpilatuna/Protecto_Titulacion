import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.page.html',
  styleUrls: ['./registro-cliente.page.scss'],
})
export class RegistroClientePage implements OnInit {
  //usuario:DatosUsuario;
  public formGroup: FormGroup;
  public passwordTypeInput = 'password';
  public mensaje:string;
  public image: any;
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

  crearvalidaciones(){

    const nombreControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern("(?=[^A-Z]*[A-Z])[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*"),
    ]));

    const apellidoControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern("(?=[^A-Z]*[A-Z])[a-zA-ZÑñÁÉÍÓÚáéíóú]*"),
    ]));

    const cedulaControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("[0-9]*"),
    ]));

    const telefonoControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(10),
      Validators.pattern("[0-9]*"),
    ]));

    const emailControl = new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(10),
        Validators.maxLength(40)

    ]));
    const passwordControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
        Validators.maxLength(40),
      
    ]));
    const foto = new FormControl('', Validators.compose([
      Validators.required,
      
    ]));

    this.formGroup = this.formBuilder.group({nombreControl,apellidoControl,cedulaControl,telefonoControl,emailControl,passwordControl,foto });
  }

  enviarimagen(event: any): void {
    this.image = event.target.files[0];
    console.log(this.image);
    
  }


  async presentAlertConfirm() {
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

  async onRegister(email, password, nombre, apellido, cedula, telefono) {
    try {
      const user = await this.authSvc.registeruser(email.value, password.value, nombre.value, apellido.value, cedula.value, telefono.value,this.image);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }else{
        if(this.authSvc.errores=="The email address is already in use by another account."){
          //console.log(this.authSvc.errores);}
          this.mensaje="El correo ya esta usado por otro usuario.";
          this.presentAlertConfirm();
        }
        
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['menu']);
    } else {
      this.mensaje="Se envió un mensaje de confirmación al correo ingresado.";
      this.presentAlertConfirm();
      this.router.navigate(['/iniciar-sesion']);
     
    }
  }

  showPassword() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
  }

 

}
