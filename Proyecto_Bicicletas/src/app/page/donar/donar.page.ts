import { Component, OnInit } from '@angular/core';
import { datosTiendas } from 'src/app/model/tienda.interface';
import { datosDonacion } from '../../model/donacion.interface';
import { ActivatedRoute} from '@angular/router';
import { DonacionService } from '../../service/donacion.service';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-donar',
  templateUrl: './donar.page.html',
  styleUrls: ['./donar.page.scss'],
})
export class DonarPage implements OnInit {
  tiendas:  datosTiendas[];
  donaciones: datosDonacion;
  iddonar=null;
  fecha:any;
  fechadonar:any;
  constructor(private route: ActivatedRoute,private Servicio:DonacionService,
    private loadingController: LoadingController,
    private nav: NavController,private alertCtrl: AlertController) { 
      
    }

  ngOnInit() {
    this.iddonar=this.route.snapshot.params['id'];
    this.Servicio.getDonacionid(this.iddonar).subscribe((donaciones) =>{
      this.donaciones = donaciones;
      this.fecha= new Date(this.donaciones.fechasolicitud['seconds']*1000);
      this.fechadonar= new Date(this.donaciones.fechadonacion['seconds']*1000);

    })
    this.Servicio.getTiendas().subscribe((tiendas) =>{
      this.tiendas = tiendas;

    })

  }
  async mensajeconfirmacion() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: 'Esta seguro de anular la donacion.',
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            this.cancelaralquilar();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log();
          }
        }
      ]
    });
    await alert.present();
  }


  async cancelar(){
    this.mensajeconfirmacion();
  }

  
  async cancelaralquilar() {
    this.donaciones.anular=true;
    if (this.iddonar) {
      this.Servicio.updateDonacion(this.donaciones, this.iddonar).then(() => {
        this.nav.navigateForward('/alquiler-donacion');
      });
    }
  }

}
