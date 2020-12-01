import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Tienda } from '../../model/tienda.interface';
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
  tipo:string;
  uid:string;
  //tienda:Tienda;
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

  async contrase() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Recuperar contraseña',
      message: this.mensaje,
      inputs: [
        {
          name: 'correo',
          placeholder: 'Correo',
          type: 'email'
        }
      ],
      buttons: [
       {
          text: 'Enviar',
          handler: data => {
        
            this.onResetPassword(data.correo);
          }
        }
      ]
    });

    await alert.present();
  }
  async onResetPassword(corr:string) {
    try {
      if(corr){
        await this.authSvc.resetPassword(corr);
        this.mensaje="Se envió un mensaje de para la recuperación de contraseña al correo ingresado.";
        this.mensajeerror();
      }else{
        this.mensaje="No se ingreso ningun correo.";
        this.mensajeerror();
      }
     
      
    } catch (error) {
      if(error['message']=="There is no user record corresponding to this identifier. The user may have been deleted."){
        this.mensaje="El usuario ingresado no se encuentra registrado o fue eliminado.";
        this.mensajeerror();
      }
    }
  }

  olvidar(){
    this.contrase();
  }

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
    this.mensaje="";
  }
 
  
  //Crear validaciones para el form 
  crearvalidaciones(){
    const tipoControl = new FormControl('', Validators.compose([
      Validators.required,
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
        Validators.maxLength(40)
    ]));
    this.formGroup = this.formBuilder.group({tipoControl,emailControl,passwordControl });
  }

  //Login con un registro
  async onLogin(email, password) {
    try {
      console.log(this.tipo,"ds");
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.uid = user.uid;
        this.redirectUser(isVerified,user.uid,email.value);
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
  private redirectUser(isVerified: boolean,id:string,correo:string): void {
    if (isVerified) {
      if(this.tipo=="tienda"){
        
        this.authSvc.getTienda(id).subscribe(tienda => {
          //this.tienda = tienda;
         
          if (tienda) {
            this.router.navigate(['editar-tienda']);
          }else{
            this.mensaje="El usuario no es de tipo tienda.";
            this.mensajeerror();
          }
        });
        
      }else if(this.tipo=="users"){
        this.authSvc.getUsuario(id).subscribe(usuario => {
          //this.tienda = tienda;
          
          if (usuario) {
            
            this.router.navigate(['profile']);
          }else{
            this.mensaje="El usuario no es de tipo usuario.";
            this.mensajeerror();
   
          }
        });
      }else if(this.tipo=="administrador"){
        this.authSvc.getAdministrador(id).subscribe(administrador => {
          //this.tienda = tienda;
        
          if (administrador) {
            this.router.navigate(['perfil-administrador']);
          }else{
            this.mensaje="El usuario no es de tipo administrador.";
            this.mensajeerror();

          }
        });
      }
    } else {
      this.mensaje="Se envió un mensaje de confirmación al siguiente corre:"+correo;
      try {
        this.authSvc.sendVerifcationEmail();
      } catch (error) {
        console.log('Error->', error);
      }
      this.mensajeerror();
      //this.router.navigate(['verify-email']);
    }
  }

  //Habilitar y deshabilitar la visualización del password
  showPassword() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
  }
 

}
