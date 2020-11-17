import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

import {BicicletasService}from '../../services/bicicletas.service';
import {datosBici}from '../../model/bicicletas.interface';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-bici',
  templateUrl: './editar-bici.page.html',
  styleUrls: ['./editar-bici.page.scss'],
})
export class EditarBiciPage implements OnInit {
  public image: any;
  idbici=null;
  formGroup: FormGroup;

  bicicleta:datosBici={
  nombre:'',
  descripcion:'',
  disponible:'',
  imagen:'',
  idtienda:'',
  tipo:'',
  color:''

  }
  constructor(private route: ActivatedRoute, 
    private nav: NavController, 
    private bicicletaservice: BicicletasService, 
    private loadingController: LoadingController,
    public formBuilder: FormBuilder,) {

      this.crearvalidaciones();
     }

  ngOnInit() {
    this.idbici=this.route.snapshot.params['id'];
    if (this.idbici){
      this.cargarbici();
    }
  }

  async cargarbici(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();

    this.bicicletaservice.getbici(this.idbici).subscribe(bici => {
      loading.dismiss();;
      this.bicicleta= bici;
    });
  }

  enviarimagen(event: any): void {
    this.image = event.target.files[0];
    console.log(this.image);
    
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
    ]));

    const descripcionControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),

    ]));
    const tipoControl = new FormControl('', Validators.compose([
      Validators.required,
  ]));

  

    this.formGroup = this.formBuilder.group({nombreControl,descripcionControl,tipoControl,colorControl });
  }

  async subirImagen(event: any): Promise<void> {
    this.image = event.target.files[0];

    this.bicicletaservice.updateImagen(this.bicicleta,this.idbici,this.image);
    this.cargarbici();
    
  }
  guardarBici(){
    this.bicicletaservice.updateBici(this.bicicleta, this.idbici).then(() => {
      this.nav.navigateForward('menu-tienda');
      
    });
  }



}
