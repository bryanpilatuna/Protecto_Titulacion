import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { datosAlquiler } from 'src/app/model/alquiler.interface';
import { datosTiendas } from 'src/app/model/tienda.interface';
import { AlquilerService } from 'src/app/service/alquiler.service';
import { datosBicicleta } from 'src/app/model/bicicleta.interface';

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.page.html',
  styleUrls: ['./alquileres.page.scss'],
})
export class AlquileresPage implements OnInit {
  tiendas:  datosTiendas[];
  pageActual: number= 1;
  alquiler: datosAlquiler[];
  id: any;
  bicicleta:datosBicicleta[];
  constructor(private Servicio:AlquilerService,
    private route: ActivatedRoute) { 
    this.id = firebase.auth().currentUser.uid;
    this.Servicio.getAlquiler().subscribe((alquileres) =>{
      this.alquiler = alquileres.filter(alquileres=>alquileres.idusuario == this.id); 
    })
    
    this.Servicio.getTiendas().subscribe((tiendas) =>{
      this.tiendas = tiendas;
   
    })
    this.Servicio.getTodoBicicletas().subscribe((bicicletas) =>{
      this.bicicleta = bicicletas;
  
    })

  }

  ngOnInit() {
    
  }

}
