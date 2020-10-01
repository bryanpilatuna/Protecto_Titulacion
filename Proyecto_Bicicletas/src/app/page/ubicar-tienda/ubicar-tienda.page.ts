import { Component, OnInit } from '@angular/core';
import { datosUbicacion } from '../../model/ubicacion.interface';
import {UbicacionService} from '../../service/ubicacion.service';
declare var google;
@Component({
  selector: 'app-ubicar-tienda',
  templateUrl: './ubicar-tienda.page.html',
  styleUrls: ['./ubicar-tienda.page.scss'],
})
export class UbicarTiendaPage implements OnInit {
  map = null;
  ubicaciones: datosUbicacion[];

  constructor(private UbicacionService: UbicacionService) { }

  ngOnInit() {
    this.loadmap();
  }

  loadmap(){

    const mapEle: HTMLElement = document.getElementById('map');
    const myLatLng= {lat: -0.2103968, lng: -78.4910514};
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
      return new google.maps.Marker({
        position: { lat: marker.position.latitude, lng: marker.position.longitude },
        map: this.map,
        title: marker.title
      });
    }

}
