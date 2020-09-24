import { Component, OnInit, VERSION  } from '@angular/core';
import { AlquilerService } from '../../service/alquiler.service';
import { datosAlquiler } from '../../model/alquiler.interface';
//import { obtenerfecha } from '../../model/alquiler.interface';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute} from '@angular/router';

import { Routes } from '@angular/router';



@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.page.html',
  styleUrls: ['./alquiler.page.scss'],
})
export class AlquilerPage implements OnInit {


  
  alquiler: datosAlquiler[];
  usuarioid= null;
  constructor(private Servicio:AlquilerService,
    private route: ActivatedRoute
    ) {
     
   }

  ngOnInit() {
    this.usuarioid=this.route.snapshot.params['id'];
    console.log(this.usuarioid);
    this.Servicio.getAlquiler(this.usuarioid).subscribe((alquileres) =>{
      this.alquiler = alquileres;
    })
  }

}
