import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { promise } from 'protractor';
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth : AngularFireAuth, private router : Router, private db : AngularFirestore) { }
  login(email:string, password:string){

    return new Promise((resolve, rejected) =>{
      this.AFauth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    });

   
  }

  logout(){
    this.AFauth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }

  register(email : string, password : string, name : string,apellido:string,telefono:string,cedula:string){

    return new Promise ((resolve, reject) => {
      this.AFauth.createUserWithEmailAndPassword(email, password).then( res =>{
          // console.log(res.user.uid);
        const uid = res.user.uid;
          this.db.collection('Usuario').doc(uid).set({
            uid : uid,
            nombres : name,
            apellidos: apellido,
            telefono: telefono,
            cedula: cedula,
            tipo: "Cliente"
            
          })
        resolve(res)
      }).catch( err => reject(err))
    })
    

  }

  resetPassword(email:string){
    this.AFauth.sendPasswordResetEmail(email);
  }
}
