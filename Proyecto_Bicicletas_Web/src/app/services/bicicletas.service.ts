import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { datosBici } from '../model/bicicletas.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FileI } from '../model/file.interface';
@Injectable({
  providedIn: 'root'
})
export class BicicletasService {
  private bicisCollection: AngularFirestoreCollection<datosBici>;
  private bicis: Observable<datosBici[]>;
  private filePath: string;
  public photoURL = null;
  aleatorio=null;

  constructor(db:AngularFirestore,private storage: AngularFireStorage) {
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
              console.log(urlImage);
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
}
