import { Component, OnInit } from '@angular/core';
import {UbicacionService}from '../services/ubicacion.service';
import {datosUbicacion}from '../model/ubicacion.interface';
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
  constructor(private UbicacionService: UbicacionService) {}

  ngOnInit() {

    this.pintarpestaña();
    
  }

 

  pintarpestaña(){

    /// Url actual
let url = window.location.href;

/// Elementos de li
const tabs = ["home", "mapa", "registro-cliente", "registro-tienda", "descagar-app"];

tabs.forEach(e => {
    /// Agregar .php y ver si lo contiene en la url
    if (url.indexOf(e) !== -1) {
        /// Agregar tab- para hacer que coincida la Id
        setActive("tab-" + e);
    }

});

/// Funcion que asigna la clase active
function setActive(id) {
    document.getElementById(id).setAttribute("class", "nav-item active");
}

  }


  

}
