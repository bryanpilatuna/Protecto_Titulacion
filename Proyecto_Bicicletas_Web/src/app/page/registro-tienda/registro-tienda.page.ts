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
  }

  crearvalidaciones(){

    const nombreControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
      Validators.pattern("(?=[^A-Z]*[A-Z])[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*"),
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

    this.formGroup = this.formBuilder.group({nombreControl,direccionControl,telefonoControl,emailControl,passwordControl,foto });
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

  async onRegister(nombre,direccion,telefono,email,password ) {
    try {
      const user = await this.authSvc.register(nombre.value,direccion.value,telefono.value,email.value,password.value,this.image);
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
      this.router.navigate(['verify-email']);
    }
  }

  showPassword() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
  }

}
