import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { datosDonacion } from 'src/app/model/donacion.interface';
import { ActivatedRoute } from '@angular/router';
import { DonacionService } from 'src/app/service/donacion.service';
@Component({
  selector: 'app-donacion',
  templateUrl: './donacion.page.html',
  styleUrls: ['./donacion.page.scss'],
})
export class DonacionPage implements OnInit {
  donaciones: datosDonacion[];
  id: any;
  constructor(private Servicio:DonacionService,
    private route: ActivatedRoute) {
    var user = firebase.auth().currentUser.uid;
    this.Servicio.getdonacion(user).subscribe((alquileres) =>{
      this.donaciones = alquileres;
      console.log(alquileres);
    })
   }

  ngOnInit() {
  }

}
