import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { datosAlquiler } from '../../model/alquiler.interface';
import { AlquilerService } from '../../service/alquiler.service';

import { datosTiendas } from '../../model/tienda.interface';

@Component({
  selector: 'app-formulario-alquiler',
  templateUrl: './formulario-alquiler.page.html',
  styleUrls: ['./formulario-alquiler.page.scss'],
})
export class FormularioAlquilerPage implements OnInit {

  usuarioid= null;
  tiendas: datosTiendas[];
  fechaactual: Date = new Date();

  alquiler: datosAlquiler ={

    idusuario :'',
    idtienda: '',
    fechadevolucion: this.fechaactual,
    fechaalquiler: this.fechaactual,
    bicicleta: '',
    fecha: this.fechaactual,
    aprobacion: false,
   

  }

  constructor(private route: ActivatedRoute, private nav: NavController,
    private alquilerService: AlquilerService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.usuarioid=this.route.snapshot.params['id'];
    if (this.usuarioid){
      this.loadTodo();
    }
    this.alquiler={

      idusuario :this.usuarioid,
      idtienda: '',
      fechadevolucion:this.fechaactual,
      fechaalquiler: this.fechaactual,
      bicicleta: '',
      fecha: this.fechaactual,
      aprobacion: false,
     
    };

    this.alquilerService.getTiendas().subscribe((tiendas) =>{
      console.log('Tiendas', tiendas);
      this.tiendas = tiendas;
      console.log(this.tiendas[0].id);
    })

  }

  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    
  }

  async crearAlquiler(){
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });


   this.alquilerService.addAlquiler(this.alquiler).then(() => {
      loading.dismiss();
      this.nav.navigateForward('/menu'); 
    });
  }

  cambiofecha(event){
    this.alquiler={

      idusuario :this.usuarioid,
      idtienda: '',
      fechadevolucion:this.fechaactual,
      fechaalquiler: new Date(event.detail.value),
      bicicleta: '',
      fecha: this.fechaactual,
      aprobacion: false,
     
    };
    

  }
  
}
