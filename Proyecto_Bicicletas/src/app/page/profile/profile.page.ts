import { Component, OnInit } from '@angular/core';
import {DatosUsuario} from '../../model/user.interface';
import {UsuarioService} from '../../service/usuario.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  usuario: DatosUsuario={
    uid: '',
    correo: '',
    nombres:'',
    apellidos: '',
    cedula: '',
    telefono: '',
    estado: ''



  }
  usuarioId= null;
  constructor(private route: ActivatedRoute, 
    private router: Router, private nav: NavController, private usuarioService: UsuarioService, 
    private loadingController: LoadingController) { 
    
  }

  ngOnInit() {
    this.usuarioId = this.route.snapshot.params['id'];
    console.log(this.usuarioId);

    if (this.usuarioId){
      this.cargarUsuario();
    } 
  }

  async cargarUsuario(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();

    this.usuarioService.getUsuario(this.usuarioId).subscribe(usuario => {
      loading.dismiss();;
      this.usuario = usuario;
    });
  }
  async guardarUsuario() {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();
 
    if (this.usuarioId) {
      this.usuarioService.updateUsuario(this.usuario, this.usuarioId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('menu');
        
      });
    } else {
      this.usuarioService.addUsuario(this.usuario).then(() => {
        loading.dismiss();
        this.router.navigate(['menu']);
      });
    }
  }

  
  



}
