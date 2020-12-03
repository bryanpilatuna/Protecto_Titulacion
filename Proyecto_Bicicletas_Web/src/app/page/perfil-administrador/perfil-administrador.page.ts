import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { DatosAdministrador } from '../../model/administrador.interface';
import { AdministradorService } from '../../services/administrador.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil-administrador',
  templateUrl: './perfil-administrador.page.html',
  styleUrls: ['./perfil-administrador.page.scss'],
})
export class PerfilAdministradorPage implements OnInit {
  id: string;
  formGroup: FormGroup;
  usuario:DatosAdministrador;
  public image: any;
  mensaje:string;
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private nav: NavController, 
    private Servicio: AdministradorService, 
    private loadingController: LoadingController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private Service: AuthService
  ) { 
    var user = firebase.auth().currentUser.uid;
    this.id = user;
    if (this.id){
      this.cargarUsuario();
     
    } 
    
    this.crearvalidaciones();
  }

  ngOnInit() {
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

      
    
    this.formGroup = this.formBuilder.group({nombreControl,apellidoControl,cedulaControl,telefonoControl });
    
  }

  async cambiarcontra(){

    this.Service.resetPassword(this.usuario.correo).then(() => {
      this.mensaje="Se envió un correo para cambiar la contraseña. ";
      this.mensajeerror();
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

  //Cargar usuario
  async cargarUsuario(){
    this.Servicio.getAdministrador(this.id).subscribe(administrador => {
    
      this.usuario = administrador;
    });
  }

  async subirImagen(event: any): Promise<void> {
    this.image = event.target.files[0];

    this.Servicio.updateImagen(this.usuario,this.id,this.image);
    this.cargarUsuario();
    
  }

    //Guardar Usuario
    async guardarUsuario() {
      if (this.id) {
        this.Servicio.updateAdministrador(this.usuario, this.id).then(() => {
          this.mensaje="Se actualizo tu perfil.";
          this.mensajeerror();
        });
      } 
    }

    
    pintarpestaña(){

      /// Url actual
  let url = window.location.href;
  
  /// Elementos de li
  const tabs = ["perfil", "tienda", "clientes"];
  
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

    

}
