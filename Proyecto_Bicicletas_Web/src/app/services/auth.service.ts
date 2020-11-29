import { Injectable } from '@angular/core';
import { User } from '../model/user.interface';
import { DatosUsuario } from '../model/user.interface';
import { DatosAdministrador } from '../model/administrador.interface';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileI } from '../model/file.interface';
import { finalize } from 'rxjs/operators';
import { Tienda } from '../model/tienda.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  errores=null;
  private filePath: string;
  public photoURL = null;
  private tiendasCollection: AngularFirestoreCollection<Tienda>;
  private tienda: Observable<Tienda[]>;
  private usuariosCollection: AngularFirestoreCollection<DatosUsuario>;
  private usuario: Observable<DatosUsuario[]>;
  private administradoresCollection: AngularFirestoreCollection<DatosAdministrador>;
  private administrador: Observable<DatosAdministrador[]>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private storage: AngularFireStorage) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );

    this.tiendasCollection = afs.collection<Tienda>('tiendas');
    this.tienda = this.tiendasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
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

    this.administradoresCollection = afs.collection<DatosAdministrador>('administrador');
    this.administrador = this.administradoresCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
   }

   obtenerusuario(){
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
   }

  getTienda(id: string){
    return this.tiendasCollection.doc<Tienda>(id).valueChanges();
  }

  getUsuario(id: string){
    return this.usuariosCollection.doc<DatosUsuario>(id).valueChanges();
  }

  getAdministrador(id: string){
    return this.administradoresCollection.doc<DatosAdministrador>(id).valueChanges();
  }

  addTodo(todo: DatosUsuario){
    return this.usuariosCollection.add(todo);
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

      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }


  async registeruser(email: string, password: string, nombre: string, apellido: string, cedu: string, tele: string,image?: FileI): Promise<User> {
    try {
      
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
    
      //await this.updateUserData(user);
      const uid = user.uid;
      const correo = user.email;
      
      this.filePath = `perfiles/${uid}`;
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

  async registeradministrador(email: string, password: string, nombre: string, apellido: string, cedu: string, tele: string,image?: FileI): Promise<User> {
    try {
      
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
    
      //await this.updateUserData(user);
      const uid = user.uid;
      const correo = user.email;
      
      this.filePath = `perfiles/${uid}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
        .pipe(
           finalize(() => {
            fileRef.getDownloadURL().subscribe(urlImage => {
              console.log(urlImage);
              this.photoURL=urlImage;
              this.afs.collection('administrador').doc(uid).set({
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

  async register(nombreform:string,direccionform:string,telefonoform,emailform:string,passwordform:string ,lat:number,lng:number,auxiliofrm:String,image?: FileI): Promise<User> {
    try {
      
      const { user } = await this.afAuth.createUserWithEmailAndPassword(emailform, passwordform);
    
      //await this.updateUserData(user);
      const uid = user.uid;
      const correo = user.email;
    
      this.filePath = `perfilestienda/${uid}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
        .pipe(
           finalize(() => {
            fileRef.getDownloadURL().subscribe(urlImage => {
              console.log(urlImage);
              this.photoURL=urlImage;
              this.afs.collection('tiendas').doc(uid).set({
                uid : uid,
                nombre : nombreform,
                direccion: direccionform,
                correo : correo,
                telefono : telefonoform,
                estado : "Activo",
                logo : this.photoURL,
                position: {latitude:lat,longitude:lng},
                auxilio:auxiliofrm,
                
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

      return user;
    } catch (error) {
      this.errores=error['message'];
      console.log('Error->', error);
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
        window.location.href = 'iniciar-sesion' ;
        //this.router.navigate(['/iniciar-sesion']);
      })
    } catch (error) {
      console.log('Error->', error);
    }
  }

}
