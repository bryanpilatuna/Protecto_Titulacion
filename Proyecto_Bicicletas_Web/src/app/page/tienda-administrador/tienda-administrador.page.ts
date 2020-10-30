import { Component, OnInit } from '@angular/core';
import { Tienda } from '../../model/tienda.interface';
import { AdministradorService } from '../../services/administrador.service';

@Component({
  selector: 'app-tienda-administrador',
  templateUrl: './tienda-administrador.page.html',
  styleUrls: ['./tienda-administrador.page.scss'],
})
export class TiendaAdministradorPage implements OnInit {
  tiendas: Tienda[];
  constructor(private Service: AdministradorService) {
    this.Service.getTiendas().subscribe((tiendas) =>{
      console.log('Todoss', tiendas);
      this.tiendas = tiendas;
    })
   }

  ngOnInit() {
  }

}
