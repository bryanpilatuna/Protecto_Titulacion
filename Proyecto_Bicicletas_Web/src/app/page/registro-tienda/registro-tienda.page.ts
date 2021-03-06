import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-registro-tienda',
  templateUrl: './registro-tienda.page.html',
  styleUrls: ['./registro-tienda.page.scss'],
})
export class RegistroTiendaPage implements OnInit {
  public formGroup: FormGroup;
  public passwordTypeInput = 'password';
  public mensaje:string;
  public image: any;
  public myLatLng:any;
  constructor(private authSvc: AuthService, 
    private router: Router,
    public formBuilder: FormBuilder,
    private geolocation: Geolocation, 
    private alertCtrl: AlertController) {
      this.crearvalidaciones();
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
      Validators.maxLength(15),
      Validators.pattern("(?=[^A-Z]*[A-Z])[a-zA-ZñÑáéíóúÁÉÍÓÚ \s]*"),
    ]));

    const direccionControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),

    ]));

    const sectorControl = new FormControl('', Validators.compose([
      Validators.required,
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

    this.formGroup = this.formBuilder.group({nombreControl,direccionControl,sectorControl,telefonoControl,emailControl,passwordControl,foto });
  }

  enviarimagen(event: any): void {
    this.image = event.target.files[0];
    
    
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

  async onRegister(nombre,direccion,sector,telefono,email,password ) {
    try {
      const user = await this.authSvc.register(nombre.value,direccion.value,sector.value,telefono.value,email.value,password.value,this.myLatLng.lat,this.myLatLng.lng,this.image);
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
      this.mensaje="Se envió un mensaje de confirmación al correo ingresado. Recuerda actualizar tu foto de perfil cuando tu tienda sea activada";
      this.presentAlertConfirm();
      this.router.navigate(['/iniciar-sesion']);
      //this.router.navigate(['verify-email']);
    }
  }

  showPassword() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
  }

  pintarpestaña(){

    /// Url actual
let url = window.location.href;

/// Elementos de li
const tabs = ["home", "mapa", "registro-cliente", "registro-tienda", "descagar-app"];

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

  async mostrarpopup(){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Documento de Validación',
      message: 'Se debe adjuntar una imagen que servirá para la activación de tu tienda',
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

}
