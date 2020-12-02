import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { datosAlquiler } from '../../model/alquiler.interface';
import { DatosUsuario } from '../../model/user.interface';
import { Notificaciones } from '../../model/notificaciones.interface';
import {AlquileresService} from '../../services/alquileres.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alquiler-rechazadas',
  templateUrl: './alquiler-rechazadas.page.html',
  styleUrls: ['./alquiler-rechazadas.page.scss'],
})
export class AlquilerRechazadasPage implements OnInit {
  tiendaid=null;
  alquileres:datosAlquiler[];
  alquileres2:datosAlquiler[];
  usuarios:DatosUsuario[];
  fechaactual: Date = new Date();
  pageActual: number= 1;

  notificacion:Notificaciones={
    respuesta:'',
    visualizar:'',
    fecha: this.fechaactual,
    tipo:'alquiler',
    idusuario:'',
    idtipo:'',
    color:'#D7F6FC',
    idtienda:'',
  }

  alquiler:datosAlquiler={
    idusuario:'',
    idtienda: '',
    fechadevolucion: this.fechaactual,
    fechaalquiler: this.fechaactual,
    bicicleta: '',
    fecha: this.fechaactual,
    aprobacion: false,
    anular:false,
    horaalquiler:'',
    horadevolucion:'',
    respuesta:'',
  }

  constructor(private route: ActivatedRoute,
    public alertController: AlertController,
    private alquilerservice: AlquileresService,
    private router: Router) { 

      var user = firebase.auth().currentUser.uid;
      this.tiendaid = user;

      this.alquilerservice.getUsuarios().subscribe((usuarios) =>{
        this.usuarios = usuarios;

      })
    }

  ngOnInit() {
    this.alquilerservice.getalquilerestiendafecha().subscribe((alquileres) =>{
      this.alquileres2 = alquileres.filter(alquileres=>alquileres.anular==true );
      })


    
  }

}
