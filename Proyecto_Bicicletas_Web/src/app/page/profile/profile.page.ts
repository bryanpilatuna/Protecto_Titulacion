import { Component, OnInit } from '@angular/core';
import { DatosUsuario } from '../../modelm/user.interface';
import { UsuarioService } from '../../service/usuario.service';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  formGroup: FormGroup;
  usuario: DatosUsuario={
    uid: '',
    correo: '',
    nombres:'',
    apellidos: '',
    cedula: '',
    telefono: '',
    estado: '',
    foto: ''
  }
  public image: any;
  usuarioId= null;
  mensaje:string;
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private nav: NavController, 
    private usuarioService: UsuarioService, 
    private loadingController: LoadingController,
    private Serviceau: AuthService,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    ) 
  { 
    var user = firebase.auth().currentUser.uid;
    this.usuarioId = user;
    this.crearvalidaciones();
  }

  ngOnInit() {

    if (this.usuarioId){
      this.cargarUsuario();
     
    } 
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

  async cambiarcontra(){

    this.Serviceau.resetPassword(this.usuario.correo).then(() => {
      this.mensaje="Se envió un correo para cambiar la contraseña. ";
      this.mensajeerror();
    });
  }

  async subirImagen(event: any): Promise<void> {
    this.image = event.target.files[0];
    this.usuarioService.updateImagen(this.usuario,this.usuarioId,this.image);
    this.cargarUsuario();
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


    this.formGroup = this.formBuilder.group({nombreControl,apellidoControl,cedulaControl,telefonoControl });
  }

  //Cargar usuario
  async cargarUsuario(){
    this.usuarioService.getUsuario(this.usuarioId).subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  async mensajeconfirmacion() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: this.mensaje,
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            this.nav.navigateForward('profile');
          }
        }
      ]
    });
    await alert.present();
  }

  //Guardar Usuario
  async guardarUsuario() {
    if (this.usuarioId) {
      this.usuarioService.updateUsuario(this.usuario, this.usuarioId).then(() => {
        this.mensaje="Se actualizó correctamente su perfil.";
        this.mensajeconfirmacion();
      });
    } 
  }

  //NAV
  async mensajeconfirmacionmapa() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: 'Se necesita activar la ubicación de su dispositivo para visualizar las tiendas.',
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            this.irmapa()
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log();
          }
        }
      ]
    });
    await alert.present();
  }

  rediperfil(){
    this.router.navigate(['profile']);
  }

  alquileresnav(){
    this.router.navigate(['formulario-alquiler']);
  }

  donacionnav(){
    this.router.navigate(['formulario-donacion']);
  }

  actividadesnav(){
    this.router.navigate(['alquiler-donacion']);

  }
  irmapa(){
    this.router.navigate(['/ubicar-tienda',this.usuarioId]);
  }

  notifinav(){
    this.router.navigate(['/notificacion']);
  }
  salir(){
    this.Serviceau.logout();
  }

  async mensajeconfirmacionsalir() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: '¿Seguro de cerrar sesión?',
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            this.salir();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log();
          }
        }
      ]
    });
    await alert.present();
  }
}
