import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  slides = [
    {
      img: 'assets/bienvenida/slider1.jpg',
      titulo: 'Visible Changes<br>in 3 weeks'
    },
    {
      img: 'assets/bienvenida/slider2.jpg',
      titulo: 'Forget about<br>strict diet'
    },
    {
      img: 'assets/bienvenida/slider3.jpg',
      titulo: 'Save money on<br>gym membership'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
