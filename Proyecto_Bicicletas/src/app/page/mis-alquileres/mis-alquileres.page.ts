import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

import { datosAlquiler } from '../../model/alquiler.interface';
import { AlquilerService } from '../../service/alquiler.service';

@Component({
  selector: 'app-mis-alquileres',
  templateUrl: './mis-alquileres.page.html',
  styleUrls: ['./mis-alquileres.page.scss'],
})
export class MisAlquileresPage implements OnInit {

  usuarioid= null;
  
  misalquileres: datosAlquiler[];

  cambiofecha: Date = new Date();



  constructor(private route: ActivatedRoute, private nav: NavController,
    private alquilerService: AlquilerService, private loadingController: LoadingController) { }

  ngOnInit() {

    this.usuarioid=this.route.snapshot.params['id'];
    this.alquilerService.getAlquileres(this.usuarioid).subscribe((misalquileres) =>{
    console.log('mis alquileres',misalquileres);
    this.misalquileres= misalquileres;
    

    })

      }

}
