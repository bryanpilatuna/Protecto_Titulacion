import { Component, OnInit } from '@angular/core';
import {UbicacionService}from '../services/ubicacion.service';
import {datosUbicacion}from '../model/ubicacion.interface';
import { Router } from '@angular/router'
declare var google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  id= null;
  map = null;
  idtienda=null;
  ubicaciones: datosUbicacion[];
  infowindow = new google.maps.InfoWindow();
  constructor(private UbicacionService: UbicacionService,private router: Router) { }

  ngOnInit() {
    this.loadmap();


    
  }
  iniciar(){
    this.router.navigate(['iniciar-sesion']);
  }

  async loadmap(){
  
    const myLatLng= {lat: -0.225219, lng: -78.5248};
    console.log(myLatLng);
    const mapEle: HTMLElement = document.getElementById('map');
    
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom:12
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {   
  
      mapEle.classList.add('show-map');
     this.renderMarker();
     
    });
    
    }


    
    renderMarker(){
      this.UbicacionService.getUbicaciones().subscribe((ubicaciones) =>{
        this.ubicaciones = ubicaciones;
        for (let index = 0; index < ubicaciones.length; index++) {
          this.addMarker(ubicaciones[index]);
        }
      })
    }

    addMarker(marker: datosUbicacion) {
      const puntos= new google.maps.Marker({
        position: { lat: marker.position.latitude, lng: marker.position.longitude },
        map: this.map,
        animation: google.maps.Animation.DROP,
      });
      const detallemarker = 
    '<h3>Nombre: '+marker.nombre+'</h3>';
    
    puntos.addListener("click", () => {
     this.infowindow.setContent(detallemarker);
      this.infowindow.open(this.map, puntos);
     console.log(marker.nombre);
    });
    }    



}
