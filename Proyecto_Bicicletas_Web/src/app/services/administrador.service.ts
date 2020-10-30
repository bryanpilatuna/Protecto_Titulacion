import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tienda } from '../model/tienda.interface';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private tiendasCollection: AngularFirestoreCollection<Tienda>;
  private tiendas: Observable<Tienda[]>;
  constructor(db:AngularFirestore) {
    this.tiendasCollection = db.collection<Tienda>('tiendas');
    this.tiendas = this.tiendasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
   }

  getTiendas(){
    return this.tiendas;
  }

  getTienda(id: string){
    return this.tiendasCollection.doc<Tienda>(id).valueChanges();
  }

  updateTienda(tienda:Tienda, id: string){
    return this.tiendasCollection.doc(id).update(tienda);
  }
}
