import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatosUsuario } from '../../model/user.interface';
import { AlertController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  todos: DatosUsuario[];
  formGroup: FormGroup; // declare it here
  passwordTypeInput = 'password';
  id: string;
  mensaje:string;
  image:any;
  usuario:string;
  contrasena:string;
  uid:string;
  prueba:string;
  prueba2:string;
  constructor(
    private authSvc: AuthService, 
    private router: Router,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private localNotifications: LocalNotifications,
    private storage: Storage,
    private loadingController: LoadingController
    ) {
    this.crearvalidaciones();
    this.loadDate();
  

   }

  ngOnInit() {

  }

  async loadDate(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();
    this.storage.get('estado').then((val) => {
      loading.dismiss();
      if(val=="Activo"){
        this.router.navigate(['menu']);  
      }
    
    });
  }

  //Mostrar mensaje de alerta
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
  async onLogin() {
    try {
      
      const user = await this.authSvc.login(this.usuario,this.contrasena);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.uid = user.uid;
        this.redirectUser(isVerified,this.uid);
        
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
        //this.redirectUser(isVerified);
      }else{
        console.log(this.authSvc.errores);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  //Redireccionar si el correo es verificado
  private redirectUser(isVerified: boolean,id:string): void {
    if (isVerified) {
      this.authSvc.obtenerUsuario(id).subscribe(usuario => {
        //this.tienda = tienda;
   
        if (usuario === undefined) {
          this.mensaje="La cuenta de correo no tiene permisos para ingresar a estos módulos.";
          this.mensajeerror();
          //alert("El usuario no es de tipo cliente.");
        }else{
          if(usuario.estado=="Inactivo"){
            this.mensaje="El usuario esta inactivo.";
            this.mensajeerror();
            //alert("El usuario esta borrado");
          }else{
            this.router.navigate(['menu']);
          }
          
        }
      });
    } else {
      this.router.navigate(['verify-email']);
    }
  }

  //Habilitar y deshabilitar la visualización del password
  showPassword() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
  }



  
  

}
