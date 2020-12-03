import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { DatosUsuario } from '../../model/user.interface';
import { AdministradorService } from '../../services/administrador.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.page.html',
  styleUrls: ['./edit-cliente.page.scss'],
})
export class EditClientePage implements OnInit {
  formGroup: FormGroup;
  usuario:DatosUsuario;
  iduser= null;
  mensaje:string;
  constructor(
    private route: ActivatedRoute,
    private nav: NavController, 
    private Service:AdministradorService,
     private loadingController: LoadingController,
     public formBuilder: FormBuilder,
     private alertCtrl: AlertController
  ) {
    this.crearvalidaciones();
   }

  ngOnInit() {
    this.iduser = this.route.snapshot.params['id'];
    if (this.iduser){
      this.loadTodo();
    }
  }

  async loadTodo(){
    this.Service.getUsuario(this.iduser).subscribe(usuario => {
    
      this.usuario = usuario;
    });
  }

  async saveTodo() {
    if (this.iduser) {
      this.Service.updateUsuario(this.usuario, this.iduser).then(() => {
        this.mensaje='Se edito el cliente correctamente.'
        this.presentAlert(this.mensaje);
        this.nav.navigateForward('/cliente-administrador');
      });
    } 
  }
  async presentAlert(mensaje:string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atención',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
  irclientes(){
    this.nav.navigateForward('cliente-administrador');
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


    const activarControl = new FormControl('', Validators.compose([
      Validators.required

  ])); 

    this.formGroup = this.formBuilder.group({nombreControl,apellidoControl,cedulaControl,telefonoControl,activarControl });
  }
  

}
