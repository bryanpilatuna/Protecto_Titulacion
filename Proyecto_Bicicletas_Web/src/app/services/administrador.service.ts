import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tienda } from '../model/tienda.interface';
import { DatosUsuario } from '../model/user.interface';
import { DatosAdministrador } from '../model/administrador.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FileI } from '../model/file.interface';
@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  public photoURL = null;
  private filePath: string;
  private tiendasCollection: AngularFirestoreCollection<Tienda>;
  private tiendas: Observable<Tienda[]>;
  private usuariosCollection: AngularFirestoreCollection<DatosUsuario>;
  private usuarios: Observable<DatosUsuario[]>;
  private usuariosCollection2: AngularFirestoreCollection<DatosUsuario>;
  private usuarios2: Observable<DatosUsuario[]>;
  private administradoresCollection: AngularFirestoreCollection<DatosAdministrador>;
  private tiendasCollection2: AngularFirestoreCollection<Tienda>;
  private tiendas2: Observable<Tienda[]>;
  private administradores: Observable<DatosAdministrador[]>;
  constructor(public db:AngularFirestore,private storage: AngularFireStorage) {
    this.tiendasCollection = this.db.collection<Tienda>('tiendas', ref => ref.orderBy('estado'));
    this.tiendas = this.tiendasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    this.usuariosCollection = this.db.collection<DatosUsuario>('users', ref => ref.orderBy('estado'));
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    this.administradoresCollection = this.db.collection<DatosAdministrador>('administrador');
    this.administradores = this.administradoresCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

   }

   busqueda(nombre:string){
    this.tiendasCollection2=this.db.collection<Tienda>('tiendas', ref => ref.orderBy('nombre').startAt(nombre).endAt(nombre+'\uf8ff'));
    this.tiendas2=this.tiendasCollection2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    return this.tiendas2;
  }

  busquedauser(nombre:string){
    this.usuariosCollection2=this.db.collection<DatosUsuario>('users', ref => ref.orderBy('correo').startAt(nombre).endAt(nombre+'\uf8ff'));
    this.usuarios2 = this.usuariosCollection2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
    return this.usuarios2;
  }

  getTiendas(){
    return this.tiendas;
  }

  getTienda(id: string){
    return this.tiendasCollection.doc<Tienda>(id).valueChanges();
  }

  updateTienda(tienda:Tienda, id: string){
    return this.tiendasCollection.doc(id).update(tienda);
  }

  getUsuarios(){
    return this.usuarios;
  }

  getUsuario(id: string){
    return this.usuariosCollection.doc<DatosUsuario>(id).valueChanges();
  }

  updateUsuario(usuario:DatosUsuario, id: string){
    return this.usuariosCollection.doc(id).update(usuario);
  }

  getAdministradores(){
    return this.administradores;
  }

  getAdministrador(id: string){
    return this.administradoresCollection.doc<DatosAdministrador>(id).valueChanges();
  }

  updateAdministrador(usuario:DatosAdministrador, id: string){
    return this.administradoresCollection.doc(id).update(usuario);
  }

  updateImagen(usuario:DatosAdministrador,id: string,image?: FileI){
    
    //this.afDB.database.ref('users/'+id).set(usuario);
    this.filePath = `perfiles/${id}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            usuario.foto=urlImage;
            this.administradoresCollection.doc(id).update(usuario);
            //this.saveUserProfile(user);
          });
        })
      ).subscribe();

    
  }
}
