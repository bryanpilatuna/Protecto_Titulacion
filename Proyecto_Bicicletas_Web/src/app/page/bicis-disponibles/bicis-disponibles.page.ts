import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import {BicicletasService}from '../../services/bicicletas.service';
import {datosBici}from '../../model/bicicletas.interface';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator'
import * as firebase from 'firebase';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  
];

@Component({
  selector: 'app-bicis-disponibles',
  templateUrl: './bicis-disponibles.page.html',
  styleUrls: ['./bicis-disponibles.page.scss'],
})
export class BicisDisponiblesPage implements OnInit {
  id=null;
  tiendaid=null;
  Si='Si';
  No='No';
  Mantenimiento='Mantenimiento';
  bicicletas: datosBici[];
  bicicleta: datosBici={
    nombre:'',
    descripcion:'',
    idtienda:'',
   disponible:'',
   imagen:'',
   tipo:'',
   color:''
  }
  constructor(private route: ActivatedRoute,
    private router: Router,
    private bicicletasService: BicicletasService) {

      var user = firebase.auth().currentUser.uid;
      this.tiendaid = user;
      
     }
//////////////////////////
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
     dataSource= new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
@ViewChild(MatPaginator)paginator:MatPaginator;
///////////////////////////
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.bicicletasService.getBicicletas(this.tiendaid).subscribe((bicicletas) =>{
      this.bicicletas = bicicletas;  
    })

  }
  
  cambiarestado(bici:datosBici,id:string){
    if(bici.disponible=='Si'){
     bici.disponible='No';
     this.bicicletasService.updateBici(bici,id).then(() => {
       this.router.navigate(['/mis-bicis']);
     });
 
    }else if(bici.disponible=='No'){
     bici.disponible='Mantenimiento';
     this.bicicletasService.updateBici(bici,id).then(() => {
       this.router.navigate(['/mis-bicis']);
     });
 
    }else if(bici.disponible=='Mantenimiento'){
     bici.disponible='Si';
     this.bicicletasService.updateBici(bici,id).then(() => {
       this.router.navigate(['/mis-bicis']);
     });
 
    }   
     
 
   }
   editarbici(id:string){
    this.router.navigate(['/editar-bici',id]);

  }


  ////////////////////////////////////////////////// Angu
 

  

}
