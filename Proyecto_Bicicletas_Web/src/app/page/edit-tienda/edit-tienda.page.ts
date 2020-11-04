import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Tienda } from '../../model/tienda.interface';
import {TiendaService} from '../../services/tienda.service';

@Component({
  selector: 'app-edit-tienda',
  templateUrl: './edit-tienda.page.html',
  styleUrls: ['./edit-tienda.page.scss'],
})
export class EditTiendaPage implements OnInit {
  tienda:Tienda;
  iduser= null;
  constructor(
    private route: ActivatedRoute,
    private nav: NavController, 
    private tiendaservice:TiendaService,
     private loadingController: LoadingController) { }

  ngOnInit() {
    this.iduser = this.route.snapshot.params['id'];
    if (this.iduser){
      this.loadTodo();
    }
  }
  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();

    this.tiendaservice.getTienda(this.iduser).subscribe(tienda => {
      loading.dismiss();
      console.log(tienda);
      this.tienda = tienda;
    });
  }

  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();
 
    if (this.iduser) {
      this.tiendaservice.updateTienda(this.tienda, this.iduser).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    } else {
      this.tiendaservice.addTienda(this.tienda).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }
}