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
  pageActual: number= 1;
  constructor(private Service: AdministradorService) {
    this.Service.getTiendas().subscribe((tiendas) =>{
 
      this.tiendas = tiendas;
    })
   }

  ngOnInit() {
  }
  buscar(busquedatienda){   
    this.Service.busqueda(busquedatienda.value).subscribe((tiendas) =>{
      this.tiendas = tiendas;
    })
  }
}
