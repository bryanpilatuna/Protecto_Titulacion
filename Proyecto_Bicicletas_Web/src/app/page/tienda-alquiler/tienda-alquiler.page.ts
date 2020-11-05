import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { datosAlquiler } from '../../model/alquiler.interface';
import {AlquileresService} from '../../services/alquileres.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda-alquiler',
  templateUrl: './tienda-alquiler.page.html',
  styleUrls: ['./tienda-alquiler.page.scss'],
})
export class TiendaAlquilerPage implements OnInit {
  tiendaid=null;
  alquileres:datosAlquiler[];
  fechaactual: Date = new Date();

  alquiler:datosAlquiler={
    idusuario:'',
    idtienda: '',
    fechadevolucion: this.fechaactual,
    fechaalquiler: this.fechaactual,
    bicicleta: '',
    fecha: this.fechaactual,
    aprobacion: false,
    anular:false
    


  }

  constructor(private route: ActivatedRoute,
    private alquilerservice: AlquileresService,
    private router: Router) { 
      var user = firebase.auth().currentUser.uid;
      this.tiendaid = user;

    }

  ngOnInit() {
  this.alquilerservice.getalquileresTienda(this.tiendaid).subscribe((alquileres) =>{
  this.alquileres = alquileres;  
 
  })

  }

  updateAlquiler(acalquiler:datosAlquiler,id:string){
  acalquiler.aprobacion=true;
  this.alquilerservice.actualizarAlquiler(acalquiler,id).then(() => {
  this.router.navigate(['/tienda-alquiler',this.tiendaid]);
  
});

    
  }

}