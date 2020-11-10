import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import {BicicletasService}from '../../services/bicicletas.service';
import {datosBici}from '../../model/bicicletas.interface';
import * as firebase from 'firebase';
@Component({
  selector: 'app-mis-bicis',
  templateUrl: './mis-bicis.page.html',
  styleUrls: ['./mis-bicis.page.scss'],
})
export class MisBicisPage implements OnInit {
  id=null;
  tiendaid=null;
  bicicletas: datosBici[];
  bicicleta: datosBici={
    nombre:'',
    descripcion:'',
    idtienda:'',
   disponible:'',
   imagen:'',
   tipo:''
  }
  constructor(private route: ActivatedRoute,private router: Router,private bicicletasService: BicicletasService) {
    var user = firebase.auth().currentUser.uid;
    this.tiendaid = user;
    
   }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];

    this.bicicletasService.getBicicletas(this.id).subscribe((bicicletas) =>{
      this.bicicletas = bicicletas;  
    })


  }
  rediregistrobici(){
    this.router.navigate(['/registro-bici',this.id]);
  }

  cambiarestado(bici:datosBici,id:string){
    bici.disponible='Si';
    this.bicicletasService.updateBici(bici,id).then(() => {
      this.router.navigate(['/mis-bicis',this.tiendaid]);
      
    });

  }

  

}
