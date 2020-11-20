import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notificaciones } from '../modelm/notificaciones.interface';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private notificacionesCollection: AngularFirestoreCollection<Notificaciones>;
  private notificaciones: Observable<Notificaciones[]>;
  private notificacionesCollection2: AngularFirestoreCollection<Notificaciones>;
  private notificaciones2: Observable<Notificaciones[]>;
  constructor(private db:AngularFirestore) { 
    this.notificacionesCollection = this.db.collection<Notificaciones>('notificaciones',ref => ref.orderBy('fecha', "desc"));
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

  getMisnotificaciones(iduser:string){

    this.notificacionesCollection2 =this.db.collection<Notificaciones>('notificaciones', ref => ref.where('idusuario', '==', iduser));
    this.notificaciones2 = this.notificacionesCollection2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    return this.notificaciones2;
  }
}
