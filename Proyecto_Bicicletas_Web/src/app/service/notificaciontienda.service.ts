import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificacionesTienda } from '../modelm/notificaciones.interface';
@Injectable({
  providedIn: 'root'
})
export class NotificaciontiendaService {
  private notificacionesCollection: AngularFirestoreCollection<NotificacionesTienda>;
  private notificaciones: Observable<NotificacionesTienda[]>;
  constructor(db:AngularFirestore) { 
    this.notificacionesCollection = db.collection<NotificacionesTienda>('notificacionestienda');
    this.notificaciones = this.notificacionesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }
  getNoficaciones(){
    return this.notificaciones;
  }

  getNotificacion(id: string){
    return this.notificacionesCollection.doc<NotificacionesTienda>(id).valueChanges();
  }

  updateNotificacion(notifica: NotificacionesTienda, id: string){
    return this.notificacionesCollection.doc(id).update(notifica);
  }
  
  addNotificacion(notifica: NotificacionesTienda){
    return this.notificacionesCollection.add(notifica);
  }
  
  removeNotificacion(id: string){
    return this.notificacionesCollection.doc(id).delete();
  }
}
