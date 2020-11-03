import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import {BicicletasService}from '../../services/bicicletas.service';
import {datosBici}from '../../model/bicicletas.interface'
@Component({
  selector: 'app-mis-bicis',
  templateUrl: './mis-bicis.page.html',
  styleUrls: ['./mis-bicis.page.scss'],
})
export class MisBicisPage implements OnInit {
  id=null;
  bicicletas: datosBici[];
  constructor(private route: ActivatedRoute,private router: Router,private bicicletasService: BicicletasService) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];

    this.bicicletasService.getBicicletas(this.id).subscribe((bicicletas) =>{
      this.bicicletas = bicicletas;  
    })


  }
  rediregistrobici(){
    this.router.navigate(['/registro-bici',this.id]);
  }

  

}
