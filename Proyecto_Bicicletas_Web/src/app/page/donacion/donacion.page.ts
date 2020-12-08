import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { datosDonacion } from 'src/app/modelm/donacion.interface';
import { datosTiendas } from 'src/app/modelm/tienda.interface';
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
  constructor(private Servicio:DonacionService,
    private route: ActivatedRoute) {
    this.id = firebase.auth().currentUser.uid;
    this.Servicio.getdonacion().subscribe((donaciones) =>{
      this.donaciones = donaciones.filter(donaciones=>donaciones.iddonante == this.id);
    })

    this.Servicio.getTiendas().subscribe((tiendas) =>{
      this.tiendas = tiendas;
    
    })
   }

  ngOnInit() {

  }


}
