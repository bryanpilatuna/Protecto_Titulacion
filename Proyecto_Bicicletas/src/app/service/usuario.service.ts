import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatosUsuario } from '../model/user.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileI } from '../model/file.interface';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject }from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private objeto=new BehaviorSubject<{}>({});
  $getObjeto= this.objeto.asObservable();
  private usuariosCollection: AngularFirestoreCollection<DatosUsuario>;
  private usuarios: Observable<DatosUsuario[]>;
  public photoURL = null;
  private filePath: string;
  constructor( db:AngularFirestore, private storage: AngularFireStorage ,public afDB: AngularFireDatabase) {
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

  updateImagen(usuario:DatosUsuario,id: string,image?: FileI){
    
    //this.afDB.database.ref('users/'+id).set(usuario);
    this.filePath = `perfiles/${id}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            usuario.foto=urlImage;
            this.usuariosCollection.doc(id).update(usuario);
            //this.saveUserProfile(user);
          });
        })
      ).subscribe();

    
  }
  addUsuario(usuario: DatosUsuario){
    return this.usuariosCollection.add(usuario);
  }
  enviarobjeto(data: any){

    this.objeto.next(data);
  }
}
