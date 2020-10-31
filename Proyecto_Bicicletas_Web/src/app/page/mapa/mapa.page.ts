import { Component, OnInit } from '@angular/core';
import {UbicacionService}from '../../services/ubicacion.service';
import {datosUbicacion}from '../../model/ubicacion.interface';
import {Geolocation } from '@ionic-native/geolocation/ngx';
import {NavController,LoadingController} from '@ionic/angular';
declare var google;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  id= null;
  map = null;
  idtienda=null;
  ubicaciones: datosUbicacion[];
  infowindow = new google.maps.InfoWindow();
  constructor(private UbicacionService: UbicacionService,
    private geolocation: Geolocation,
    private nav: NavController,
    private loadinCtrl: LoadingController) { }

  ngOnInit() {
    this.loadmap();
  }
  async loadmap(){
  
    const rta= await this.geolocation.getCurrentPosition();
    const myLatLng= {lat: rta.coords.latitude, lng: rta.coords.longitude};
    console.log(myLatLng);
    const mapEle: HTMLElement = document.getElementById('map');
    
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom:9
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
    '<h3>Nombre: '+marker.nombre+'</h3>' +
    "<p>"+'<img src="https://png.pngtree.com/png-vector/20190826/ourlarge/pngtree-house-location-icon-png-image_1701248.jpg" height="25px" width="25px" />'+" <b>Dirección: </b>"+marker.direccion+"</b></p>" +
    "<p>"+'<img src="https://i.pinimg.com/originals/b9/2f/b6/b92fb6bd92b53e40ad90b1a160b33b0d.jpg" height="20px" width="20px" />'+" <b>Teléfono: </b>"+marker.telefono+"</b> </p>"+
    "<p>"+'<img src="https://i.pinimg.com/originals/23/98/2d/23982d31ee932c26a021b175c47bb157.png" height="20px" width="20px" />'+" <b>Correo: </b>"+marker.correo+"</b> </p>";
        
    puntos.addListener("click", () => {
     //this.infowindow.setContent(detallemarker);
      this.infowindow.open(this.map, puntos);
     // this.idtienda=marker.id;
     console.log(marker.nombre);
    });
    }    



}
