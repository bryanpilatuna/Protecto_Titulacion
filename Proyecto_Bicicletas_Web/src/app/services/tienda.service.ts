import { Injectable } from '@angular/core';
import {Tienda} from '../model/tienda.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import {FileI}from '../model/file.interface';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject }from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  private objeto=new BehaviorSubject<{}>({});
  $getObjeto= this.objeto.asObservable();
  private tiendasCollection: AngularFirestoreCollection<Tienda>;
  private tiendas: Observable<Tienda[]>;

  public photoURL = null;
  private filePath: string;

  constructor(public db:AngularFirestore, private storage: AngularFireStorage ,public afDB: AngularFireDatabase) { 
    this.tiendasCollection=this.db.collection<Tienda>('tiendas');
    this.tiendas=this.tiendasCollection.snapshotChanges().pipe(
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
  getTienda(id:string){
    return this.tiendasCollection.doc<Tienda>(id).valueChanges();
  }

  updateTienda(tienda:Tienda,id:string){
    return this.tiendasCollection.doc(id).update(tienda)

  }

  updateImagen(tienda:Tienda,id:string,image?:FileI){
    this.filePath = `perfilestienda/${id}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            tienda.logo=urlImage;
            this.tiendasCollection.doc(id).update(tienda);
            //this.saveUserProfile(user);
          });
        })
      ).subscribe();


  }
  enviarobjeto(data:any){
  this.objeto.next(data)
  }
  addTienda(tienda:Tienda){
  return this.tiendasCollection.add(tienda)
  }


}
