import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
 

  constructor(private authSvc: AuthService, 
    private router: Router) {
  
    
     }

  async ngOnInit() {

   
    
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

  }}