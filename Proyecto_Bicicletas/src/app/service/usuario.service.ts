import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatosUsuario } from '../model/user.interface';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuariosCollection: AngularFirestoreCollection<DatosUsuario>;
  private usuarios: Observable<DatosUsuario[]>;
  constructor( db:AngularFirestore ) {
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
  addUsuario(usuario: DatosUsuario){
    return this.usuariosCollection.add(usuario);
  }
}
