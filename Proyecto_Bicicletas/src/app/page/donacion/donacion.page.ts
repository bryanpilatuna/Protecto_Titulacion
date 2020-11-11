import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { datosDonacion } from 'src/app/model/donacion.interface';
import { datosTiendas } from 'src/app/model/tienda.interface';
import { ActivatedRoute } from '@angular/router';
import { DonacionService } from 'src/app/service/donacion.service';
@Component({
  selector: 'app-donacion',
  templateUrl: './donacion.page.html',
  styleUrls: ['./donacion.page.scss'],
})
export class DonacionPage implements OnInit {
  tiendas:  datosTiendas[];
  donaciones: datosDonacion[];
  id: any;
  vacio:boolean;
  fechabusqueda:Date;
  constructor(private Servicio:DonacionService,
    private route: ActivatedRoute) {
    this.id = firebase.auth().currentUser.uid;
    this.Servicio.getdonacion(this.id).subscribe((donaciones) =>{
      this.donaciones = donaciones;
      if(donaciones.length==0){
        this.vacio=true;
      }else{
        this.vacio=false;
      }
   
    })

    this.Servicio.getTiendas().subscribe((tiendas) =>{
      this.tiendas = tiendas;
    
    })
   }

  ngOnInit() {
  }
  cambiofecha(event){
    this.fechabusqueda= new Date(event.detail.value);
    console.log("Entra",this.fechabusqueda.getTime());
    this.Servicio.busqueda(this.id,this.fechabusqueda).subscribe((busquedadonacion) =>{
      this.donaciones = busquedadonacion;
    
    })
  }

}
