import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
 

  constructor(private authSvc: AuthService,private alertCtrl: AlertController) {
  
    
     }

  async ngOnInit() {

   

  }


  async mensajeubi() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atención',
      message: 'Activa la ubicación para registrar una tienda.',
      buttons: ['OK']
    });

    await alert.present();
  }


  
 }