import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events  } from 'ionic-angular';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { User } from '../../clases/usr';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import {Observable} from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  splash = true;
  email : string;
  clave : string;
  user : User;
  
   constructor(public navCtrl: NavController, 
               public navParams: NavParams,
               private ofauth: AngularFireAuth,
               public utilities: UtilitiesProvider,
               private storage: Storage,
               public firebase: FirebaseProvider,
               public events: Events) { 
     this.getPicturesList(); }

 

  async getPicturesList(){

    let pictureList = <Observable<any>> await this.firebase.operationDB("getAll","archivos"); 

    pictureList.subscribe(imgs =>{
        console.log("imgs ",imgs);
        this.storage.set('imgs',imgs);
        this.events.publish('imgsEvent',imgs);
    })
    
  }

  setTestLogin(em :string , cl :string){
    this.clave = cl;
    this.email = em;
  }

  async login(){

    this.utilities.showLoading(true);

    try{
          const log = await this.ofauth.auth.signInWithEmailAndPassword(this.email,this.clave);
          this.user = new User(log.user.email,log.user.email,log.user.uid);
          this.storage.set('usr',this.user);
          this.utilities.showToast('INGRESO EXITOSO !!');
          this.navCtrl.push('HomePage');
   
    }catch(e){

          this.utilities.dismissLoading();
          this.utilities.showAlert("Error : ",e.message); 
          console.log("ERROR : ",e);
    }
    
  }

}
