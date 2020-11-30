import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { datosBici } from '../model/bicicletas.interface';
import { Tienda } from '../model/tienda.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FileI } from '../model/file.interface';
@Injectable({
  providedIn: 'root'
})
export class BicicletasService {
  private bicisCollection: AngularFirestoreCollection<datosBici>;
  private bicis: Observable<datosBici[]>;

  private tiendaCollection: AngularFirestoreCollection<Tienda>;
  private tienda: Observable<Tienda[]>;

  private BicicletaCollection: AngularFirestoreCollection<datosBici>;
  private bicicleta: Observable<datosBici[]>;


  private filePath: string;
  public photoURL = null;
  aleatorio=null;

  constructor(private db:AngularFirestore,private storage: AngularFireStorage) {
    this.bicisCollection = db.collection<datosBici>('bicicleta');
    this.bicis = this.bicisCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
    this.tiendaCollection= db.collection<Tienda>('Tiendas');
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



   addbici(bici: datosBici,image?: FileI){
    this.numAleatorio(0,1000000)
    this.filePath = `bicicletas/${this.aleatorio}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
        .pipe(
           finalize(() => {
            fileRef.getDownloadURL().subscribe(urlImage => {
          
              this.photoURL=urlImage;
              bici.imagen=this.photoURL;
              this.bicisCollection.add(bici);
            });
          })
        ).subscribe();
  
  }

  numAleatorio(a, b) {
    this.aleatorio= Math.round(Math.random() * (b - a) + parseInt(a, 10));
  }

  getBicicletas(idtienda:string){

    this.BicicletaCollection =this.db.collection<datosBici>('bicicleta', ref => ref.where('idtienda', '==', idtienda));
    this.bicicleta = this.BicicletaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    return this.bicicleta;
  }
  
  getbici(id: string){
    return this.bicisCollection.doc<datosBici>(id).valueChanges();
  }
  
  updateImagen(bici:datosBici,id:string,image?:FileI){
    this.filePath = `bicicletas/${id}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            bici.imagen=urlImage;
            this.bicisCollection.doc(id).update(bici);
            //this.saveUserProfile(user);
          });
        })
      ).subscribe();


  }

  updateBici(bici:datosBici,id:string){
    return this.bicisCollection.doc(id).update(bici)

  }

}
