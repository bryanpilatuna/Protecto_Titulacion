import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { datosAlquiler } from '../model/alquiler.interface';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {

  private alquilerCollection: AngularFirestoreCollection<datosAlquiler>;
  private alquiler: Observable<datosAlquiler[]>;

  constructor(db:AngularFirestore) { 

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
  addAlquiler(alquiler: datosAlquiler){
    return this.alquilerCollection.add(alquiler);
  }
}
