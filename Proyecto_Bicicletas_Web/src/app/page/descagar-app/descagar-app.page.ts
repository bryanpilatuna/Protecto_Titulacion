import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-descagar-app',
  templateUrl: './descagar-app.page.html',
  styleUrls: ['./descagar-app.page.scss'],
})
export class DescagarAppPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.pintarpestaña();
 
    
  }

  pintarpestaña(){

    /// Url actual
let url = window.location.href;

/// Elementos de li
const tabs = ["home", "mapa", "registro", "descagar-app"];

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
