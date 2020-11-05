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
  constructor(private Servicio:DonacionService,
    private route: ActivatedRoute) {
    var user = firebase.auth().currentUser.uid;
    this.Servicio.getdonacion(user).subscribe((donaciones) =>{
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

}
