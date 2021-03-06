import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { datosDonacion } from '../model/donacion.interface';
import { DatosUsuario } from '../model/user.interface';
import { Notificaciones} from '../model/notificaciones.interface';

@Injectable({
  providedIn: 'root'
})
export class DonacionesService {

  private notificacionesCollection: AngularFirestoreCollection<Notificaciones> ;
  private notificacion: Observable<Notificaciones[]>;

  private usuariosCollection: AngularFirestoreCollection<DatosUsuario>;
  private usuario: Observable<DatosUsuario[]>;

  private donacionCollection: AngularFirestoreCollection<datosDonacion>;
  private donacion: Observable<datosDonacion[]>;

  private donacionidCollection: AngularFirestoreCollection<datosDonacion>;
  private donacionid: Observable<datosDonacion[]>;
  private donacion2Collection: AngularFirestoreCollection<datosDonacion>;
  private donacion2: Observable<datosDonacion[]>;

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

      this.notificacionesCollection = db.collection<Notificaciones>('notificaciones');
      this.notificacion = this.notificacionesCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
          
            return {id, ...data};
          });
        })
      );
      this.donacion2Collection = this.db.collection<datosDonacion>('donacion',ref => ref.orderBy('fechadonacion', "desc"));
      this.donacion2 = this.donacion2Collection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        })
      );

    
   }

   getDonacionTienda(idtienda: string){
    this.donacionidCollection = this.db.collection<datosDonacion>('donacion', ref => ref.where('idtienda', '==', idtienda));
    this.donacionid = this.donacionidCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    return this.donacionid;
   }

   actualizarDonacion(donacion:datosDonacion,id:string){
    return this.donacionCollection.doc(id).update(donacion);
   }

   getUsuarios(){
    return this.usuario;
  }

  addNotificacion(notificacion:Notificaciones){
    return this.notificacionesCollection.add(notificacion);
  } 


  getalquileresdonacionfecha(){
    return this.donacion2;
  }


}
