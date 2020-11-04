import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { datosAlquiler } from '../model/alquiler.interface';

@Injectable({
  providedIn: 'root'
})
export class AlquileresService {
  private alquilerCollection: AngularFirestoreCollection<datosAlquiler>;
  private alquiler: Observable<datosAlquiler[]>;

  private alquileridCollection: AngularFirestoreCollection<datosAlquiler>;
  private alquilerid: Observable<datosAlquiler[]>;

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
}
