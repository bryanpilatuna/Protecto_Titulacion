import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Tienda } from '../../model/tienda.interface';
import {TiendaService} from '../../services/tienda.service';
@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.page.html',
  styleUrls: ['./edit-cliente.page.scss'],
})
export class EditClientePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
