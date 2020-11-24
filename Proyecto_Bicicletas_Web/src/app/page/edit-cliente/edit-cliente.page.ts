import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { DatosUsuario } from '../../model/user.interface';
import { AdministradorService } from '../../services/administrador.service';
@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.page.html',
  styleUrls: ['./edit-cliente.page.scss'],
})
export class EditClientePage implements OnInit {
  user:DatosUsuario;
  iduser= null;
  constructor(
    private route: ActivatedRoute,
    private nav: NavController, 
    private Service:AdministradorService,
     private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.iduser = this.route.snapshot.params['id'];
    if (this.iduser){
      this.loadTodo();
    }
  }

  async loadTodo(){
    this.Service.getUsuario(this.iduser).subscribe(usuario => {
      console.log(usuario);
      this.user = usuario;
    });
  }

  async saveTodo() {
    if (this.iduser) {
      this.Service.updateUsuario(this.user, this.iduser).then(() => {
        this.nav.navigateForward('/cliente-administrador');
      });
    } 
  }

}
