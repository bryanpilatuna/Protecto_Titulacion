import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { datosAlquiler } from 'src/app/model/alquiler.interface';
import { datosTiendas } from 'src/app/model/tienda.interface';
import { AlquilerService } from 'src/app/service/alquiler.service';

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.page.html',
  styleUrls: ['./alquileres.page.scss'],
})
export class AlquileresPage implements OnInit {
  tiendas:  datosTiendas[];
  alquiler: datosAlquiler[];
  id: any;
  constructor(private Servicio:AlquilerService,
    private route: ActivatedRoute) { 
    var user = firebase.auth().currentUser.uid;
    this.Servicio.getAlquiler(user).subscribe((alquileres) =>{
      this.alquiler = alquileres;
      console.log(alquileres[0].idtienda);
    })
    this.Servicio.getTiendas().subscribe((tiendas) =>{
      this.tiendas = tiendas;
      console.log(tiendas[0].id);
    })

    }

  ngOnInit() {
    
  }

}