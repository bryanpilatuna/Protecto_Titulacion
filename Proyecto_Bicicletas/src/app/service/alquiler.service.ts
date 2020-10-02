import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { datosAlquiler } from '../model/alquiler.interface';
import { datosTiendas } from '../model/tienda.interface';


@Injectable({
  providedIn: 'root'
})
export class AlquilerService {

  private alquilerCollection: AngularFirestoreCollection<datosAlquiler>;
  private alquiler: Observable<datosAlquiler[]>;

  private tiendaCollection: AngularFirestoreCollection<datosTiendas>;
  private tienda: Observable<datosTiendas[]>;


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

    this.tiendaCollection = db.collection<datosTiendas>('tiendas');
    this.tienda = this.tiendaCollection.snapshotChanges().pipe(
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
  getTiendas(){
    
    return this.tienda;
  }
  getAlquileres(id: string){
    return this.alquilerCollection.doc<datosAlquiler>(id).valueChanges();
 
  }
  
  updateAlquileres(todo:datosAlquiler, id: string){
    return this.alquilerCollection.doc(id).update(todo);
  }

  getAlquiler(iduser:string){
    console.log(iduser);
    this.alquileridCollection = this.db.collection<datosAlquiler>('alquiler', ref => ref.where('idusuario', '==', iduser));
    this.alquilerid = this.alquileridCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    console.log(this.alquilerid);
    return this.alquilerid;
  }



  
}
