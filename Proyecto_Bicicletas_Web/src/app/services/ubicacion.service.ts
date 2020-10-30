import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {datosUbicacion}from '../model/ubicacion.interface';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private UbicacionesCollection: AngularFirestoreCollection<datosUbicacion>;
  private ubicaciones: Observable<datosUbicacion[]>;
  constructor(db:AngularFirestore) {

    this.UbicacionesCollection = db.collection<datosUbicacion>('tiendas');
    
    this.ubicaciones = this.UbicacionesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
    
   }

   getUbicaciones(){
    return this.ubicaciones;
  }
}
