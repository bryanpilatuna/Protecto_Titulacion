import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {
  constructor(private router: Router,private navCtrl:NavController ) { }

  ngOnInit() {
  }
  click(){
    this.router.navigate(['menu-cliente']);
   
  }

}

