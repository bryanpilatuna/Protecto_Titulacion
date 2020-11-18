import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {

  constructor(private router: Router,private nav: NavController, ) { }

  ngOnInit() {
  }
  
  regresarmenu(){
    //this.router.navigateByUrl('/menu');

  }

}
