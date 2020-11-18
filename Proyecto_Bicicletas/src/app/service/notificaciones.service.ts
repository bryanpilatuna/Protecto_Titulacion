import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notificaciones } from '../model/notificaciones.interface';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private notificacionesCollection: AngularFirestoreCollection<Notificaciones>;
  private notificaciones: Observable<Notificaciones[]>;
  constructor(db:AngularFirestore) { 
    this.notificacionesCollection = db.collection<Notificaciones>('notificaciones',ref => ref.orderBy('fecha'));
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


  getTodos(){
    return this.notificaciones;
  }

  getTodo(id: string){
    return this.notificacionesCollection.doc<Notificaciones>(id).valueChanges();
  }

  updateTodo(notifica: Notificaciones, id: string){
    return this.notificacionesCollection.doc(id).update(notifica);
  }
  
  addTodo(notifica: Notificaciones){
    return this.notificacionesCollection.add(notifica);
  }
  
  removeTodo(id: string){
    return this.notificacionesCollection.doc(id).delete();
  }
}
