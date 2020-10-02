import { Component, OnInit } from '@angular/core';
import { datosTiendas } from 'src/app/model/tienda.interface';
import { datosDonacion } from '../../model/donacion.interface';
import { ActivatedRoute} from '@angular/router';
import { DonacionService } from '../../service/donacion.service';
@Component({
  selector: 'app-donar',
  templateUrl: './donar.page.html',
  styleUrls: ['./donar.page.scss'],
})
export class DonarPage implements OnInit {
  tiendas:  datosTiendas[];
  donaciones: datosDonacion;
  iddonar=null;
  constructor(private route: ActivatedRoute,private Servicio:DonacionService) { }

  ngOnInit() {
    this.iddonar=this.route.snapshot.params['id'];
    this.Servicio.getDonacionid(this.iddonar).subscribe((donaciones) =>{
      this.donaciones = donaciones;
      console.log(this.donaciones.idtienda);
    })
    this.Servicio.getTiendas().subscribe((tiendas) =>{
      this.tiendas = tiendas;
      console.log(tiendas[0].id);
    })

  }

}
