import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificacionesTienda } from '../model/notificaciones.interface';
import { Tienda } from '../model/tienda.interface';
import { DatosUsuario } from '../model/user.interface';


@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private notificacionesCollection: AngularFirestoreCollection<NotificacionesTienda>;
  private notificacion: Observable<NotificacionesTienda[]>;

  private tiendaCollection: AngularFirestoreCollection<Tienda>;
  private tienda: Observable<Tienda[]>;

  private usuariosCollection: AngularFirestoreCollection<DatosUsuario>;
  private usuario: Observable<DatosUsuario[]>;

  

  constructor(private db:AngularFirestore) { 
    this.notificacionesCollection = db.collection<NotificacionesTienda>('notificacionestienda');
    this.notificacion = this.notificacionesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    this.tiendaCollection= db.collection<Tienda>('Tiendas');
    this.tienda = this.tiendaCollection.snapshotChanges().pipe(
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

  }

  getMisnotificaciones(idtienda:string){
    this.notificacionesCollection =this.db.collection<NotificacionesTienda>('notificacionestienda', ref => ref.where('idtienda', '==', idtienda).where('visualizar', '==', 'No'));
    this.notificacion = this.notificacionesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    return this.notificacion;
  }

  updateNotificacion(noti:NotificacionesTienda,id:string){
    return this.notificacionesCollection.doc(id).update(noti)

  }

  getUsuarios(){
    return this.usuario;
  }


}
