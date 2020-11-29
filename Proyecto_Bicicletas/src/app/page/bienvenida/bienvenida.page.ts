import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  slides = [
    {
      img: 'assets/bienvenida/alquiler.png',
      titulo: '¿Necesitas alquilar una bicicleta? <br>Esta aplicación la conseguirá por ti.'
    },
    {
      img: 'assets/bienvenida/donacion.png',
      titulo: '¿Tienes una bicicleta que no uses? <br>Puedes donarla a través de esta aplicación.'
    },
    {
      img: 'assets/bienvenida/tienda.png',
      titulo: 'Encuentras los talleres de bicicletas más cercanos a través de un mapa activo.'
    }
  ];
  constructor(private storage: Storage,private router: Router) { 
    //this.loadDate();
    //this.ganttEach();
  }

  ngOnInit() {
  }
  /*loadDate(){
    this.storage.get('estado').then((val) => {
      if(val=="Activo"){
        this.router.navigate(['menu']);  
      }
    
    });
  }*/

  /*ganttEach() {
    alert("entra");
    //window.setInterval(this.ganttEach, 10000); // calls itself again in one second
  }*/

}
