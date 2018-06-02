import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  image : any;

  constructor(public navCtrl: NavController, 
  	          public camera: Camera,
  	          public _DomSanitizationService: DomSanitizer,
  	          public firebase: FirebaseProvider,
  	          public utilities: UtilitiesProvider,
  	          private storage: Storage) {
  }

  options: CameraOptions = {
    encodingType: this.camera.EncodingType.JPEG,
    destinationType: this.camera.DestinationType.DATA_URL
  }


  async tomarImagen(tipo : string) {

    try{

      let base64Image = 'data:image/jpeg;base64,';
      let imageData = await this.camera.getPicture(this.options); 
         
      this.utilities.showLoading(true);
      this.image = base64Image + imageData;

      this.enviarImagen(tipo);

    }catch(e){
       console.log(e.message);
       this.utilities.showAlert("Atencion!",e.message);
    }

  }

  async enviarImagen(tipo : string){
    
    try{
    	
      let usr = await this.storage.get('usr');

    	let now = '/' + new Date().toLocaleString().split('/').join('-');;
    	let uploadOk = await this.firebase.getStorage().ref('imagenes/'+usr.nombre+now)
    	                                         .putString(this.image,'data_url');
    	let filePath = uploadOk.metadata.fullPath;
    	let fileUrl = await this.firebase.getStorage().storage.ref(filePath).getDownloadURL();
        
      let data = { url: fileUrl, usrName: usr.nombre, tipo: tipo, fecha: new Date().toLocaleString()};
      await this.firebase.InsertarConIdAutomatico("archivos",data); 

      this.navCtrl.push('ListaPage');

    }catch(e){

    	console.log(e.message);
      throw e.message;
      
    } 

  }

}
