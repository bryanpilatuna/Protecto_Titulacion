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
  constructor(private route: ActivatedRoute,private router: Router,private bicicletasService: BicicletasService) {
    var user = firebase.auth().currentUser.uid;
    this.tiendaid = user;
    
   }

  ngOnInit() {
    //this.id=this.route.snapshot.params['id'];

    this.bicicletasService.getBicicletas(this.tiendaid).subscribe((bicicletas) =>{
      this.bicicletas = bicicletas;  
    })


  }
  rediregistrobici(){
    this.router.navigate(['/registro-bici',this.id]);
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

  

}
