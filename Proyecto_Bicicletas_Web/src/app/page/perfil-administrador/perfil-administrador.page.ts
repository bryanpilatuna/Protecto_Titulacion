import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-perfil-administrador',
  templateUrl: './perfil-administrador.page.html',
  styleUrls: ['./perfil-administrador.page.scss'],
})
export class PerfilAdministradorPage implements OnInit {
  id: string;
  constructor() { 
    var user = firebase.auth().currentUser.uid;
    this.id = user;
    console.log(this.id);
  }

  ngOnInit() {
  }

}
