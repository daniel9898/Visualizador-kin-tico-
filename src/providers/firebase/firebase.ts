//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

import { Observable } from 'rxjs/Observable';
//"angularfire2": "5.0.0-rc.4" ES LA VERSION QUE FUNCIONA
//"firebase": "4.8.0",
@Injectable()
export class FirebaseProvider {
  
  constructor(private fbAuth: AngularFireAuth,
  	          private fbStore: AngularFirestore,
              private fbStorage: AngularFireStorage) {
    
  }

  async authentication(user: any){
    return this.fbAuth.auth.createUserWithEmailAndPassword(user.email, user.clave);
  }

  operationDB(operationName : string, collectionName: string, id?: string,  data?: any){

    switch (operationName) {
      case "getAll":
        return this.fbStore.collection(collectionName).valueChanges();
      case "get":
        return this.fbStore.collection(collectionName).doc(id).ref.get();
      case "insert":  //se podria verificar si es insert y id no esta definido generar id automatico
        return this.fbStore.collection(collectionName).doc(id).ref.set(data);
      case "delete":
        return this.fbStore.collection(collectionName).doc(id).ref.delete();
      case "update":
        return this.fbStore.collection(collectionName).doc(id).ref.update(data);
    }
  }

  querysDB( collectionName: string, field: string, oper: any, value: string){

    return this.fbStore.collection(collectionName).ref.where(field, oper, value).get();
  }

  getRef(collectionName: string){
    return this.fbStore.collection(collectionName).ref;
  }

  InsertarConIdAutomatico(collectionName: string,  data : any){
    return this.fbStore.collection(collectionName).add(data);
  }

  getStorage(){
    return this.fbStorage;
  }



}
