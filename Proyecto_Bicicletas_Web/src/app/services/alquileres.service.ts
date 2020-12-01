import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { datosAlquiler } from '../model/alquiler.interface';
import { DatosUsuario} from '../model/user.interface';
import { Notificaciones} from '../model/notificaciones.interface';

@Injectable({
  providedIn: 'root'
})
export class AlquileresService {
  private notificacionesCollection: AngularFirestoreCollection<Notificaciones>;
  private notificacion: Observable<Notificaciones[]>;

  private usuariosCollection: AngularFirestoreCollection<DatosUsuario>;
  private usuario: Observable<DatosUsuario[]>;

  private alquilerCollection: AngularFirestoreCollection<datosAlquiler>;
  private alquiler: Observable<datosAlquiler[]>;

  private alquileridCollection: AngularFirestoreCollection<datosAlquiler>;
  private alquilerid: Observable<datosAlquiler[]>;

  private alquiler2Collection: AngularFirestoreCollection<datosAlquiler>;
  private alquiler2: Observable<datosAlquiler[]>;

  constructor(private db:AngularFirestore) {
    this.alquilerCollection = db.collection<datosAlquiler>('alquiler');
    this.alquiler = this.alquilerCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );

    this.usuariosCollection = db.collection<DatosUsuario>('users');
    this.usuario = this.usuariosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );

    this.notificacionesCollection = db.collection<Notificaciones>('notificaciones');
    this.notificacion = this.notificacionesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );

    this.alquiler2Collection = this.db.collection<datosAlquiler>('alquiler',ref => ref.orderBy('fechaalquiler', "desc"));
    this.alquiler2 = this.alquiler2Collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

  

   }

   getalquileresTienda(idtienda: string){
    this.alquileridCollection = this.db.collection<datosAlquiler>('alquiler', ref => ref.where('idtienda', '==', idtienda));
    this.alquilerid = this.alquileridCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    return this.alquilerid;
   }

   actualizarAlquiler(alquiler:datosAlquiler,id:string){
    return this.alquilerCollection.doc(id).update(alquiler);



   }

   getalquilerestiendafecha(){
    return this.alquiler2;
  }

   getUsuarios(){
    return this.usuario;
  }

  addNotificacion(notificacion:Notificaciones){
    return this.notificacionesCollection.add(notificacion);
    }
}
