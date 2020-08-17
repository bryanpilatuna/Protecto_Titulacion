import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { datosAlquiler } from '../../model/alquiler.interface';
import { AlquilerService } from '../../service/alquiler.service';


@Component({
  selector: 'app-formulario-alquiler',
  templateUrl: './formulario-alquiler.page.html',
  styleUrls: ['./formulario-alquiler.page.scss'],
})
export class FormularioAlquilerPage implements OnInit {

  usuarioid= null;

  alquiler: datosAlquiler ={

    idusuario :'',
    nombretienda: '',
    fechadevolucion: '',
    fechaalquiler: '',
    bicicleta: '',
    fecha: '',
    aprobacion: false,
   

  }

  constructor(private route: ActivatedRoute, private nav: NavController,
    private alquilerService: AlquilerService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.usuarioid=this.route.snapshot.params['id'];
    this.alquiler={

      idusuario :this.usuarioid,
      nombretienda: '',
      fechadevolucion: '',
      fechaalquiler: '',
      bicicleta: '',
      fecha: '',
      aprobacion: false,
     
    };

  }
  async crearAlquiler(){
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    this.alquilerService.addAlquiler(this.alquiler).then(() => {
      loading.dismiss();
      this.nav.navigateForward('/menu');
    });
  }
}
