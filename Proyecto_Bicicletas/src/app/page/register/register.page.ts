import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formGroup: FormGroup;
  passwordTypeInput = 'password';
  constructor(
    private authSvc: AuthService, 
    private router: Router,
    public formBuilder: FormBuilder
    ) {
      this.crearvalidaciones();
    }

  ngOnInit() {
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
    const passwordControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
        Validators.maxLength(40),
      
    ]));

    this.formGroup = this.formBuilder.group({nombreControl,apellidoControl,cedulaControl,telefonoControl,emailControl,passwordControl });
  }

  async onRegister(email, password, nombre, apellido, cedula, telefono) {
    try {
      const user = await this.authSvc.register(email.value, password.value, nombre.value, apellido.value, cedula.value, telefono.value);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error', error);
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
