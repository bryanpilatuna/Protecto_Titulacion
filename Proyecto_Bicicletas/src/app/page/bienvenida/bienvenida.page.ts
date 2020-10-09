import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  slides = [
    {
      img: 'assets/bienvenida/alquiler.png',
      titulo: '¿Necesitas alquilar una bicicleta? <br>Nosotros la conseguimos por ti'
    },
    {
      img: 'assets/bienvenida/donacion.png',
      titulo: '¿Tienes una bicicleta que no uses? <br>Puedes donarla'
    },
    {
      img: 'assets/bienvenida/ubicacion.jpg',
      titulo: 'Encuentra las tiendas a través <br>del mapa en tiempo real'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
