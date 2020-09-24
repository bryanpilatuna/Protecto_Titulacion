import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { datosAlquiler } from 'src/app/model/alquiler.interface';
import { AlquilerService } from 'src/app/service/alquiler.service';

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.page.html',
  styleUrls: ['./alquileres.page.scss'],
})
export class AlquileresPage implements OnInit {
  alquiler: datosAlquiler[];
  usuarioid= null;
  id: any;
  constructor(private Servicio:AlquilerService,
    private route: ActivatedRoute) { 
      this.usuarioid="gUFSslYPfrVo99jWdnEUiCA3z9w2";
      var user = firebase.auth().currentUser.uid;
      console.log(user);
    console.log(this.usuarioid);
    this.Servicio.getAlquiler(user).subscribe((alquileres) =>{
      this.alquiler = alquileres;
    })
    }

  ngOnInit() {
    
  }

}
