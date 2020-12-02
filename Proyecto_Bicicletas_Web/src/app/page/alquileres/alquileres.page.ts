import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { datosAlquiler } from 'src/app/modelm/alquiler.interface';
import { datosTiendas } from 'src/app/modelm/tienda.interface';
import { AlquilerService } from 'src/app/service/alquiler.service';
import { datosBicicleta } from 'src/app/modelm/bicicleta.interface';
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
  vacio:boolean=true;
  bicicleta:datosBicicleta[];
  constructor(private Servicio:AlquilerService,
    private route: ActivatedRoute) { 
    this.id = firebase.auth().currentUser.uid;
    this.Servicio.getAlquiler(this.id).subscribe((alquileres) =>{
      this.alquiler = alquileres;
      for(let i in this.alquiler){
        if(this.alquiler[i].idusuario==this.id){
          this.vacio=false;
        }
      }
 
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
