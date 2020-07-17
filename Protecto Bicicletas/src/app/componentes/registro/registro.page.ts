import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public  email : string;
  public  name : string;
  public password : string;
  public cedula : string;
  public apellidos : string;
  public telefono : string;
  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit() {
  }

  OnSubmitRegister(){
    if(this.email==undefined||this.password==undefined||this.name==undefined||this.apellidos==undefined||this.telefono==undefined||this.cedula==undefined
      ||this.email==null||this.password==null||this.name==null||this.apellidos==null||this.telefono==null||this.cedula==null
      ||this.email==""||this.password==""||this.name==""||this.apellidos==""||this.telefono==""||this.cedula==""){
      alert('Ingresar todos los campos.');
    }else{
      this.auth.register(this.email, this.password,this.name,this.apellidos,this.telefono,this.cedula).then( auth => {
        this.router.navigate(['home'])
      }).catch(err => console.log(err))
    }
    
  }

}
