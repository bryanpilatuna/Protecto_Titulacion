import { Component, OnInit } from '@angular/core';
import {datosBici} from '../../model/bicicletas.interface';
import {BicicletasService}from '../../services/bicicletas.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-registro-bici',
  templateUrl: './registro-bici.page.html',
  styleUrls: ['./registro-bici.page.scss'],
})
export class RegistroBiciPage implements OnInit {
  public formGroup: FormGroup;
  public image: any;
  tiendaid=null;
  mensaje:string;

  bici:datosBici = {
    descripcion: '',
    nombre:'',
    disponible:'',
    idtienda:'',
    imagen:'',
    tipo:'',
    color:'',

  };
  constructor(private route: ActivatedRoute,
    private bicicletasservice:BicicletasService,
    private nav: NavController,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    ) { this.crearvalidaciones();
      var user = firebase.auth().currentUser.uid;
      this.tiendaid = user;
      
    }

  ngOnInit() {

    //this.tiendaid=this.route.snapshot.params['id'];
    this.bici.idtienda=this.tiendaid;
    this.bici.disponible='Si';
  }

  crearvalidaciones(){

    const nombreControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ]));
    const colorControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
      Validators.pattern("[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*")
    ]));

    const tipoControl = new FormControl('', Validators.compose([
      Validators.required,
  ]));

    const descripcionControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),

    ]));
  
    const foto = new FormControl('', Validators.compose([
      Validators.required,
      
    ]));

    this.formGroup = this.formBuilder.group({nombreControl,descripcionControl,foto,tipoControl,colorControl });
  }

guardarbici(){

  this.bicicletasservice.addbici(this.bici,this.image)
  this.mensaje='Bicicleta creada con éxito'
     this.presentAlert(this.mensaje);
  this.nav.navigateForward('/mis-bicis');
  

}
async presentAlert(mensaje:string) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Atención',
    message: mensaje,
    buttons: ['OK']
  });

  await alert.present();
}
  enviarimagen(event: any): void {
    this.image = event.target.files[0];
 
    
  }

  regresar(){
    this.nav.navigateForward('mis-bicis');
  
  }


}
