import { Injectable } from '@angular/core';
import { User } from '../modelm/user.interface';
import { DatosUsuario } from '../modelm/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileI } from '../modelm/file.interface';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  errores=null;
  private filePath: string;
  public photoURL = null;

  private usuariosCollection: AngularFirestoreCollection<DatosUsuario>;
  private usuario: Observable<DatosUsuario[]>;
  
  constructor(
    public afAuth: AngularFireAuth, 
    private afs: AngularFirestore, 
    private router: Router, 
    private storage: AngularFireStorage,
    private nav: NavController) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );

    this.usuariosCollection = afs.collection<DatosUsuario>('users');
    this.usuario = this.usuariosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
   }

   obtenerUsuario(id: string){
    return this.usuariosCollection.doc<DatosUsuario>(id).valueChanges();
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

  async register(email: string, password: string, nombre: string, apellido: string, cedu: string, tele: string,image?: FileI): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = user.uid;
      const correo = user.email;
      this.filePath = `perfiles/${uid}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
        .pipe(
           finalize(() => {
            fileRef.getDownloadURL().subscribe(urlImage => {
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
      await this.afAuth.signOut().then(() => {
       
        this.nav.navigateForward('/login'); 
        //window.location.href = 'login' ;
      })
    } catch (error) {
      console.log('Error->', error);
    }
  }

  getUsuario(){
    return this.afAuth.authState;
  }
  
}
