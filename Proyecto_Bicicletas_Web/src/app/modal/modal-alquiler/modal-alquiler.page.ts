import { Component, Input, OnInit } from '@angular/core';
import { AlquilerService } from '../../service/alquiler.service';
import { datosBicicleta } from '../../modelm/bicicleta.interface';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-alquiler',
  templateUrl: './modal-alquiler.page.html',
  styleUrls: ['./modal-alquiler.page.scss'],
})
export class ModalAlquilerPage implements OnInit {

  bicicletas:datosBicicleta[];
  id="Z4G3rWPMf93WkhZ49H9Y";
  @Input() idtienda: string;
  validacion="Si"
  constructor(private alquilerService: AlquilerService,private modalController: ModalController) { 
    
  }

  ngOnInit() {
 
    this.alquilerService.getBicicletas(this.idtienda).subscribe((bicicletas) =>{
      this.bicicletas = bicicletas;
     
    })
  }

  seleccionbicicleta(idbici:string){

    this.modalController.dismiss({
      bici:idbici,
    });
  }

  salirsinargumentos(){
    this.modalController.dismiss();
  }


}
