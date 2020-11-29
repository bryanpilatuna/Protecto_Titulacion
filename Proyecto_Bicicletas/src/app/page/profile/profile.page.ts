import { Component, OnInit } from '@angular/core';
import { DatosUsuario } from '../../model/user.interface';
import { UsuarioService } from '../../service/usuario.service';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

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
    private Service: AuthService,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    ) 
  { 
    this.crearvalidaciones();
  }

  ngOnInit() {
    this.usuarioId = this.route.snapshot.params['id'];

    if (this.usuarioId){
      this.cargarUsuario();
     
    } 
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
            this.nav.navigateForward('menu');
          }
        }
      ]
    });
    await alert.present();
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

    this.Service.resetPassword(this.usuario.correo).then(() => {
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
    this.formGroup = this.formBuilder.group({nombreControl,apellidoControl,cedulaControl,telefonoControl,emailControl });
  }

  //Cargar usuario
  async cargarUsuario(){
    this.usuarioService.getUsuario(this.usuarioId).subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  //Guardar Usuario
  async guardarUsuario() {
    if (this.usuarioId) {
      this.usuarioService.updateUsuario(this.usuario, this.usuarioId).then(() => {
        this.mensaje="Se actualizo su perfil correctamente.";
        this.mensajeconfirmacion();
      });
    } 
  }
}
