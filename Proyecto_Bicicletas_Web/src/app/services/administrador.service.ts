import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tienda } from '../model/tienda.interface';
import { DatosUsuario } from '../model/user.interface';
import { DatosAdministrador } from '../model/administrador.interface';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private tiendasCollection: AngularFirestoreCollection<Tienda>;
  private tiendas: Observable<Tienda[]>;
  private usuariosCollection: AngularFirestoreCollection<DatosUsuario>;
  private usuarios: Observable<DatosUsuario[]>;
  private administradoresCollection: AngularFirestoreCollection<DatosAdministrador>;
  private administradores: Observable<DatosAdministrador[]>;
  constructor(db:AngularFirestore) {
    this.tiendasCollection = db.collection<Tienda>('tiendas');
    this.tiendas = this.tiendasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    this.usuariosCollection = db.collection<DatosUsuario>('users');
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    this.administradoresCollection = db.collection<DatosAdministrador>('administrador');
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
}
