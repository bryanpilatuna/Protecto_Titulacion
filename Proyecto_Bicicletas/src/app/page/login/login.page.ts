import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('passwordEyeLogin', { read: ElementRef }) passwordEye: ElementRef;
  passwordTypeInput = 'password';
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onLogin(email, password) {
 
    try {
      if(email.value.length > 0){
        console.log("muy largo");
      
        const user = await this.authSvc.login(email.value, password.value);
        if (user) {
          
          const isVerified = this.authSvc.isEmailVerified(user);
          //console.log('verified->',isVerified);
          this.redirectUser(isVerified);
        }
      }
    } catch (error) {
      console.log('Error->', error['message']);
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
