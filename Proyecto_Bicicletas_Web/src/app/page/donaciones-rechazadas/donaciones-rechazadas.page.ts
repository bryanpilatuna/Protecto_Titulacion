import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { datosDonacion } from '../../model/donacion.interface';
import { Notificaciones} from '../../model/notificaciones.interface';
import {DonacionesService} from '../../services/donaciones.service';
import { DatosUsuario } from '../../model/user.interface';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-donaciones-rechazadas',
  templateUrl: './donaciones-rechazadas.page.html',
  styleUrls: ['./donaciones-rechazadas.page.scss'],
})
export class DonacionesRechazadasPage implements OnInit {
  tiendaid=null;
  false=false;
  true=true;
  pageActual: number= 1;
  donaciones:datosDonacion[];
  donaciones2:datosDonacion[];
  usuarios:DatosUsuario[];
  notificaciones:Notificaciones[];
  fechaactual: Date = new Date();

  donacion:datosDonacion={
    iddonante:'',
    fechadonacion:this.fechaactual,
    fechasolicitud:this.fechaactual,
    estado:'',
    descripcion:'',
    aprobacion:false,
    idtienda:'',
    anular:false,
    modo:'',
    direccion:'',
    respuesta:'',
  }

  notificacion:Notificaciones={
    respuesta:'',
    visualizar:'',
    fecha: this.fechaactual,
    tipo:'donacion',
    idusuario:'',
    idtipo:'',
    color:'#D7F6FC',
    idtienda:'',
    
  }
  constructor(private route: ActivatedRoute,
    public alertController: AlertController,
    private donacionesservice: DonacionesService,
    private router: Router) { var user = firebase.auth().currentUser.uid;
      this.tiendaid = user;

      this.donacionesservice.getUsuarios().subscribe((usuarios) =>{
        this.usuarios = usuarios;

      })}

  ngOnInit() {
    //this.tiendaid=this.route.snapshot.params['id'];
    this.donacionesservice.getalquileresdonacionfecha().subscribe((donacion) =>{
      this.donaciones2 = donacion.filter(donacion=>donacion.anular==true );
      })
  }
  
 


}
