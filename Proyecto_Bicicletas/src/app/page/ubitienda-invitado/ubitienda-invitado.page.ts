import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { datosUbicacion } from '../../model/ubicacion.interface';
import {UbicacionService} from '../../service/ubicacion.service';
import {UsuarioService} from '../../service/usuario.service';
import {NavController,LoadingController} from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-ubitienda-invitado',
  templateUrl: './ubitienda-invitado.page.html',
  styleUrls: ['./ubitienda-invitado.page.scss'],
})
export class UbitiendaInvitadoPage implements OnInit {
  ubicaciones: datosUbicacion[];
  infowindow = new google.maps.InfoWindow();
  map = null;

  constructor( private UbicacionService: UbicacionService,
    private nav: NavController,
    private UsuarioService: UsuarioService,
    private loadinCtrl: LoadingController,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.loadmap();
  }

  async loadmap(){
   
    const myLatLng= {lat: -0.225219, lng: -78.5248};
    const mapEle: HTMLElement = document.getElementById('map');
    
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom:12
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {   
  
      mapEle.classList.add('show-map');
      this.renderMarker();
     
    });

    //this.miubicacion(rta.coords.latitude,rta.coords.longitude);
    
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
    "<b>Regístrate para ver toda la información. </b>";
  
        
    puntos.addListener("click", () => {
      this.infowindow.setContent(detallemarker);
      this.infowindow.open(this.map, puntos);
    });
    }    
    regresar(){
      window.location.href = 'menu-invitado' ;
    }

}
