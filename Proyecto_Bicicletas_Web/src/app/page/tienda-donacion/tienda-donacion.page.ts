import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { datosDonacion } from '../../model/donacion.interface';
import {DonacionesService} from '../../services/donaciones.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda-donacion',
  templateUrl: './tienda-donacion.page.html',
  styleUrls: ['./tienda-donacion.page.scss'],
})
export class TiendaDonacionPage implements OnInit {
  tiendaid=null;
  donaciones:datosDonacion[];
  fechaactual: Date = new Date();

  donacion:datosDonacion={
    iddonante:'',
    fechadonacion:this.fechaactual,
    estado:'',
    descripcion:'',
    aprobacion:false,
    idtienda:'',
    anular:false,

  }
  constructor(private route: ActivatedRoute,
    private donacionesservice: DonacionesService,
    private router: Router) {
      var user = firebase.auth().currentUser.uid;
      this.tiendaid = user;
     }

  ngOnInit() {
  //this.tiendaid=this.route.snapshot.params['id'];
  this.donacionesservice.getDonacionTienda(this.tiendaid).subscribe((donaciones) =>{
  this.donaciones = donaciones;  
 
  })
  }

  updateDonacion(acdonacion:datosDonacion,iddonacion:string){
    acdonacion.aprobacion=true;
    this.donacionesservice.actualizarDonacion(acdonacion,iddonacion).then(() => {
      this.router.navigate(['/tienda-donacion',this.tiendaid]);
      
    });
    

  }



}
