import { Component, OnInit } from '@angular/core';
import {datosBici} from '../../model/bicicletas.interface';
import {BicicletasService}from '../../services/bicicletas.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro-bici',
  templateUrl: './registro-bici.page.html',
  styleUrls: ['./registro-bici.page.scss'],
})
export class RegistroBiciPage implements OnInit {
  public formGroup: FormGroup;
  public image: any;
  tiendaid:null;

  bici:datosBici = {
    descripcion: '',
    nombre:'',
    disponible:'',
    idtienda:'',
    imagen:'',
    tipo:''

  };
  constructor(private route: ActivatedRoute,
    private bicicletasservice:BicicletasService,
    private nav: NavController,
    public formBuilder: FormBuilder,
    ) { this.crearvalidaciones();}

  ngOnInit() {

    this.tiendaid=this.route.snapshot.params['id'];
    this.bici.idtienda=this.tiendaid;
    this.bici.disponible='Si';
  }

  crearvalidaciones(){

    const nombreControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ]));

    const descripcionControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),

    ]));
  
    const foto = new FormControl('', Validators.required)

    this.formGroup = this.formBuilder.group({nombreControl,descripcionControl,foto });
  }

guardarbici(){

  this.bicicletasservice.addbici(this.bici,this.image)
  this.nav.navigateForward('/menu-tienda');
}
  enviarimagen(event: any): void {
    this.image = event.target.files[0];
    console.log(this.image);
    
  }


}
