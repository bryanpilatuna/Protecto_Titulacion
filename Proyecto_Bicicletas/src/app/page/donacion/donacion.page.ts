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
  pageActual: number= 1;
  donaciones: datosDonacion[];
  id: any;
  vacio:boolean=true;
  fechabusqueda:Date;
  constructor(private Servicio:DonacionService,
    private route: ActivatedRoute) {
    this.id = firebase.auth().currentUser.uid;
    this.Servicio.getdonacion(this.id).subscribe((donaciones) =>{
      this.donaciones = donaciones;
      for(let i in this.donaciones){
   
        if(this.donaciones[i].iddonante==this.id){
          this.vacio=false;
        }else{
          var l = this.donaciones.indexOf( this.donaciones[i] );
          console.log(l);
          this.donaciones.splice(l,1); 
        }
      }
    })

    this.Servicio.getTiendas().subscribe((tiendas) =>{
      this.tiendas = tiendas;
    
    })
   }

  ngOnInit() {

  }


}
