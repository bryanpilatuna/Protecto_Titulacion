import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  name: string;
  photo: string;
  constructor(private authservice : AuthService, private router: Router) { }

  ngOnInit() {
    this.authservice.getUsuario().subscribe(user => {
      this.name = user.displayName;
      this.photo = user.photoURL;
    });
  }

  pageperfile(){
    this.router.navigate(['profile']);
  }
  salir(){
    this.authservice.logout();
  }

}
