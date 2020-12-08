import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mis-bicis',
  templateUrl: './mis-bicis.page.html',
  styleUrls: ['./mis-bicis.page.scss'],
})
export class MisBicisPage implements OnInit {
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private Service: AuthService,) {
    
   }

  ngOnInit() {
    
   // document.getElementById("tab-mis-bicis").setAttribute("class", "nav-item active");

  }
  rediregistrobici(){
    this.router.navigate(['/registro-bici']);
  }

  ///////////

  
redihome(){
  this.router.navigate(['/menu-tienda']);
}

rediperfil(){
  this.router.navigate(['/editar-tienda']);


}
redibicicletas(){
  this.router.navigate(['/mis-bicis']);
}
redidonaciones(){
  this.router.navigate(['/tienda-donacion']);
}
redialquileres(){
  this.router.navigate(['/tienda-alquiler']);
}

redinotifi(){
  this.router.navigate(['/notificaciones-tienda']);
    


}
salir(){

  this.Service.logout();
}


  

}
