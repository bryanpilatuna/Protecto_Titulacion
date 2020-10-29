import { Component, OnInit } from '@angular/core';
import { DatosUsuario } from '../../model/user.interface';
import { UsuarioService } from '../../service/usuario.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  formGroup: FormGroup;
  usuario: DatosUsuario={
    uid: '',
    correo: '',
    nombres:'',
    apellidos: '',
    cedula: '',
    telefono: '',
    estado: '',
    foto: ''
  }
  public image: any;
  usuarioId= null;
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private nav: NavController, 
    private usuarioService: UsuarioService, 
    private loadingController: LoadingController,
    public formBuilder: FormBuilder
    ) 
  { 
    this.crearvalidaciones();
  }

  ngOnInit() {
    this.usuarioId = this.route.snapshot.params['id'];

    if (this.usuarioId){
      this.cargarUsuario();
     
    } 
  }

  async subirImagen(event: any): Promise<void> {
    this.image = event.target.files[0];

    this.usuarioService.updateImagen(this.usuario,this.usuarioId,this.image);
    this.cargarUsuario();
    
  }

  crearvalidaciones(){

    const nombreControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
      Validators.pattern("(?=[^A-Z]*[A-Z])[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*"),
    ]));

    const apellidoControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
      Validators.pattern("(?=[^A-Z]*[A-Z])[a-zA-ZÑñÁÉÍÓÚáéíóú]*"),
    ]));

    const cedulaControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13),
      Validators.pattern("[0-9]*"),
    ]));

    const telefonoControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(10),
      Validators.pattern("[0-9]*"),
    ]));

    const emailControl = new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(10),
        Validators.maxLength(40)

    ]));
    
    this.formGroup = this.formBuilder.group({nombreControl,apellidoControl,cedulaControl,telefonoControl,emailControl });
    
  }

  //Cargar usuario
  async cargarUsuario(){
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();

    this.usuarioService.getUsuario(this.usuarioId).subscribe(usuario => {
      loading.dismiss();;
      this.usuario = usuario;
    });
  }

  //Guardar Usuario
  async guardarUsuario() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
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
