import { Component, OnInit } from '@angular/core';
import { datosTiendas } from 'src/app/model/tienda.interface';
import { datosDonacion } from '../../model/donacion.interface';
import { ActivatedRoute} from '@angular/router';
import { DonacionService } from '../../service/donacion.service';
import { NavController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-donar',
  templateUrl: './donar.page.html',
  styleUrls: ['./donar.page.scss'],
})
export class DonarPage implements OnInit {
  tiendas:  datosTiendas[];
  donaciones: datosDonacion;
  iddonar=null;
  constructor(private route: ActivatedRoute,private Servicio:DonacionService,
    private loadingController: LoadingController,
    private nav: NavController) { }

  ngOnInit() {
    this.iddonar=this.route.snapshot.params['id'];
    this.Servicio.getDonacionid(this.iddonar).subscribe((donaciones) =>{
      this.donaciones = donaciones;

    })
    this.Servicio.getTiendas().subscribe((tiendas) =>{
      this.tiendas = tiendas;

    })

  }

  
  async cancelaralquilar() {
    this.donaciones.anular=true;
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();
 
    if (this.iddonar) {
      this.Servicio.updateDonacion(this.donaciones, this.iddonar).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/menu');
      });
    } else {
      this.Servicio.addDonacion (this.donaciones).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/menu');
      });
    }
  }

}
