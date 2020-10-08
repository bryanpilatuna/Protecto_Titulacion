import { Component, OnInit } from '@angular/core';
import { datosUbicacion } from '../../model/ubicacion.interface';
import {UbicacionService} from '../../service/ubicacion.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {LoadingController} from '@ionic/angular';
declare var google;
@Component({
  selector: 'app-ubicar-tienda',
  templateUrl: './ubicar-tienda.page.html',
  styleUrls: ['./ubicar-tienda.page.scss'],
})
export class UbicarTiendaPage implements OnInit {
  map = null;
  ubicaciones: datosUbicacion[];

  constructor(
    private UbicacionService: UbicacionService,
    private geolocation: Geolocation,
    private loadinCtrl: LoadingController) { }

  ngOnInit() {
    this.loadmap();
  }

  async loadmap(){
    const loading= await this.loadinCtrl.create();
    loading.present();
    const rta= await this.geolocation.getCurrentPosition();
    const myLatLng= {lat: rta.coords.latitude, lng: rta.coords.longitude};
    const mapEle: HTMLElement = document.getElementById('map');
    
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom:12
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {   
  
      mapEle.classList.add('show-map');
      this.renderMarker();
     
    });
    loading.dismiss();
    this.miubicacion(rta.coords.latitude,rta.coords.longitude);
    
    }
    
    miubicacion(lat: number, lng: number){
    
      return new google.maps.Marker({
        position: {lat,lng},
      map: this.map,
      title: 'ESTAS AQUI',
      animation: google.maps.Animation.DROP,
      icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
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
        animation: google.maps.Animation.DROP,
        title: marker.title
      });
    }

}
