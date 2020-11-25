import { Component, OnInit } from '@angular/core';
import { datosAlquiler } from '../../model/alquiler.interface';
import { DatosUsuario } from '../../model/user.interface';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tienda-alquiler',
  templateUrl: './tienda-alquiler.page.html',
  styleUrls: ['./tienda-alquiler.page.scss'],
})
export class TiendaAlquilerPage implements OnInit {
  tiendaid=null;
  alquileres:datosAlquiler[];
  usuarios:DatosUsuario[];
 

  

  constructor() { 
      var user = firebase.auth().currentUser.uid;
      this.tiendaid = user;

     
    }

  ngOnInit() {
  

  }

 
}
