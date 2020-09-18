import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatosUsuario } from '../../model/user.interface';
//import { Platform, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  todos: DatosUsuario[];
  formGroup: FormGroup; // declare it here
  passwordTypeInput = 'password';
  id: string;
  constructor(
    private authSvc: AuthService, 
    private router: Router,
    public formBuilder: FormBuilder
    //public platform:Platform,
    //public loadingController: LoadingController
    ) {
    this.crearvalidaciones();
    
   }

  ngOnInit() {
  }

  crearvalidaciones(){
    // Campo Contraseña
    const emailControl = new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(10),
        Validators.maxLength(40)

    ]));
    const passwordControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
        Validators.maxLength(40)
    ]));
    // Añado Propiedades al Form
    this.formGroup = this.formBuilder.group({emailControl,passwordControl });
  }

  async onLogin(email, password) {

    try {
      /*const loading = await this.loadingController.create({
        message: 'Verificando......',
      
      });*/
      //await loading.present();  
      //const { role, data } = await loading.onDidDismiss();
      const user = await this.authSvc.login(email.value, password.value);
      
      if (user) {
        //loading.dismiss();
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    
    } catch (error) {
      //console.log('Error->', error['message']);
    }

    
  }

  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
        
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['menu']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }

  

  showPassword() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
  }

}
