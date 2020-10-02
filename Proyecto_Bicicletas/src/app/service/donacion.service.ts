import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { datosDonacion } from '../model/donacion.interface';
import { datosTiendas } from '../model/tienda.interface';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  
  private donacionCollection: AngularFirestoreCollection<datosDonacion>;
  private donacion: Observable<datosDonacion[]>;

  private listdonacionCollection: AngularFirestoreCollection<datosDonacion>;
  private listdonacion: Observable<datosDonacion[]>;

  private tiendaCollection: AngularFirestoreCollection<datosTiendas>;
  private tienda: Observable<datosTiendas[]>;

  constructor(private db:AngularFirestore) { 
    this.donacionCollection = db.collection<datosDonacion>('donacion');
    this.donacion = this.donacionCollection.snapshotChanges().pipe(
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
 addDonacion(donacion: datosDonacion){
  return this.donacionCollection.add(donacion);
  }

  getTiendas(){
    return this.tienda;
  }

  getDonacionid(id: string){
    return this.donacionCollection.doc<datosDonacion>(id).valueChanges();
 
  }


  
  getdonacion(iduser:string){
    console.log(iduser);
    this.listdonacionCollection = this.db.collection<datosDonacion>('donacion', ref => ref.where('iddonante', '==', iduser));
    this.listdonacion = this.listdonacionCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );

    return this.listdonacion;
  }


}
