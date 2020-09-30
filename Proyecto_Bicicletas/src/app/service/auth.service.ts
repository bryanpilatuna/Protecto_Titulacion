import { Injectable } from '@angular/core';
import { User } from '../model/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileI } from '../model/file.interface';
import { finalize } from 'rxjs/operators';
import { Imagen } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  errores=null;
  private filePath: string;
  //photoURL: Observable<Imagen>;
  public photoURL = null;
  
  
  
  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private storage: AngularFireStorage) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
   }
   async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      //this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  uploadImage(email: string, password: string, nombre: string, apellido: string, cedu: string, tele: string,image?: FileI ){
  
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
         finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            console.log(urlImage);
            this.photoURL=urlImage;
            //console.log(this.photoURL);
       
            //this.grabarimagen();
            //console.log(this.photoURL );
            return this.register(email, password, nombre, apellido, cedu, tele,this.photoURL);
           
            //this.saveUserProfile(user);
          });
        })
      ).subscribe();
     


  }


  async register(email: string, password: string, nombre: string, apellido: string, cedu: string, tele: string,image?: FileI): Promise<User> {
    try {
      
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
    
      //await this.updateUserData(user);
      const uid = user.uid;
      const correo = user.email;
      
      this.filePath = `images/${image.name}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
        .pipe(
           finalize(() => {
            fileRef.getDownloadURL().subscribe(urlImage => {
              console.log(urlImage);
              this.photoURL=urlImage;
              this.afs.collection('users').doc(uid).set({
                uid : uid,
                cedula: cedu,
                nombres : nombre,
                apellidos : apellido,
                correo : correo,
                telefono : tele,
                estado : "Activo",
                foto : this.photoURL
                
              })
              //console.log(this.photoURL);
         
              //this.grabarimagen();
              //console.log(this.photoURL );
              //return this.register(email, password, nombre, apellido, cedu, tele,this.photoURL);
             
              //this.saveUserProfile(user);
            });
          })
        ).subscribe();

      
      
      await this.sendVerifcationEmail();
      return user;
    } catch (error) {
      this.errores=error['message'];
      console.log('Error->', error);
    }
  }


  

  

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      //this.updateUserData(user);
      return user;
    } catch (error) {
      this.errores=error['message'];
      console.log('Error->', error['message']);
    }
  }


  async sendVerifcationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }

  async logout(): Promise<void> {
    try {
      //await this.afAuth.signOut();
      await this.afAuth.signOut().then(() => {
        this.router.navigate(['/login']);
      })
    } catch (error) {
      console.log('Error->', error);
    }
  }

  /*private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    console.log("entra");
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }*/


  getUsuario(){
    return this.afAuth.authState;
  }
  
}
