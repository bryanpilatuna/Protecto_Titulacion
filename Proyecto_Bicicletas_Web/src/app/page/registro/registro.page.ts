import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public formGroup: FormGroup;
  public formGroup2: FormGroup;
  public passwordTypeInput = 'password';
  public mensaje:string;
  public image: any;
  public image2: any;
  public myLatLng:any;
  constructor(private authSvc: AuthService, 
    private router: Router,
    public formBuilder: FormBuilder,
    private geolocation: Geolocation, 
    private alertCtrl: AlertController) {
      this.crearvalidaciones();
      this.crearvalidaciones2();
    
     }

  async ngOnInit() {

    const rta= await this.geolocation.getCurrentPosition();
    this.myLatLng= {lat: rta.coords.latitude, lng: rta.coords.longitude};
    console.log('latitud mia',this.myLatLng.lat,'longitud mia',this.myLatLng.lng)
    
    this.pintarpestaña();
  }

  crearvalidaciones(){

    const nombreControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
      Validators.pattern("(?=[^A-Z]*[A-Z])[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*"),
    ]));

    const apellidoControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
      Validators.pattern("(?=[^A-Z]*[A-Z])[a-zA-ZÑñÁÉÍÓÚáéíóú]*"),
    ]));

    const cedulaControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13),
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
    const foto = new FormControl('', Validators.required)

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

  async Confirmcorreo() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: this.mensaje,
      buttons: [
        {
          text: 'Aceptar',
          handler: data => {
            
          }
        },
        {
          text: 'Reenviar',
          handler: data => {
            this.onSendEmail();
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
      this.mensaje="Hemos enviado un correo electrónico de confirmación.";
      this.presentAlertConfirm();
   
    }
  }

  showPassword() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
  }
  pintarpestaña(){

        /// Url actual
    let url = window.location.href;

    /// Elementos de li
    const tabs = ["home", "mapa", "registro", "descagar-app"];

    tabs.forEach(e => {
        /// Agregar .php y ver si lo contiene en la url
        if (url.indexOf(e) !== -1) {
            /// Agregar tab- para hacer que coincida la Id
            setActive("tab-" + e);
        }

    });

    /// Funcion que asigna la clase active
    function setActive(id) {
        document.getElementById(id).setAttribute("class", "nav-item active");
    }

  }

  ///Comienza
  crearvalidaciones2(){

    const nombreControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
      Validators.pattern("(?=[^A-Z]*[A-Z])[a-zA-ZñÑáéíóúÁÉÍÓÚ \s]*"),
    ]));

    const direccionControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),

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
    const foto = new FormControl('', Validators.required)

    this.formGroup2 = this.formBuilder.group({nombreControl,direccionControl,telefonoControl,emailControl,passwordControl,foto });
  }

  async onRegister2(nombre2,direccion2,telefono2,email2,password2 ) {
    try {
      const user = await this.authSvc.register(nombre2.value,direccion2.value,telefono2.value,email2.value,password2.value,this.myLatLng.lat,this.myLatLng.lng,this.image2);
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
  enviarimagen2(event: any): void {
    this.image2 = event.target.files[0];
    console.log(this.image2);
    
  }

  //Aceptar
  async onSendEmail(): Promise<void> {
    try {
      await this.authSvc.sendVerifcationEmail().then(() => {});;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  ngOnDestroy(): void {
    this.authSvc.logout();
  }

}
