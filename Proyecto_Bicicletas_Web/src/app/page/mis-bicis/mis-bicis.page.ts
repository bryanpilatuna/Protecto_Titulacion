import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mis-bicis',
  templateUrl: './mis-bicis.page.html',
  styleUrls: ['./mis-bicis.page.scss'],
})
export class MisBicisPage implements OnInit {
  
  constructor(private route: ActivatedRoute,
    private router: Router) {
    
   }

  ngOnInit() {
    
   // document.getElementById("tab-mis-bicis").setAttribute("class", "nav-item active");

  }
  rediregistrobici(){
    this.router.navigate(['/registro-bici']);
  }

  
  

}
