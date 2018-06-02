import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import { Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  @ViewChild(Slides) slides: Slides;
  pictureList : Array<any>;
  subscription : Subscription; 
  ejeX : number;

 

  constructor(public navCtrl: NavController, 
  	          private storage: Storage,
              public events: Events,
              private deviceMotion: DeviceMotion) {

    
    //this.subscribeList();
    this.storage.get('imgs').then(list => this.pictureList = list)
                            .catch(error => console.log(error));

    this.subscription = this.deviceMotion.watchAcceleration()
        .subscribe((acceleration: DeviceMotionAccelerationData) => {

            console.log("SIZE ", this.slides.length());
            console.log("CURRENT INDEX ", this.slides.getActiveIndex());
            console.log(acceleration);
  
            if(acceleration.x < -0.7){
               this.goToSlide('DER');
            }else if(acceleration.x > 1){
               this.goToSlide('IZQ');
            }else if(acceleration.y < 1){
               this.goToSlide('CENTRO');
            }
        });
  }

  goToSlide(position: string) {

    switch (position) {
      case "DER":
        this.slides.isEnd() ? this.slides.slideTo(0,500) : this.slides.slideTo(this.slides.getActiveIndex()+1,500);
        break;
      case "IZQ":
        this.slides.slideTo(0,500);
        break;
      case "CENTRO":
        !this.slides.isBeginning() ? this.slides.getActiveIndex()-1 : this.slides.slideTo(this.slides.length(),500);
        break;
      default:
        break;
    }

    console.log("CURRENT INDEX ", this.slides.getActiveIndex());

  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

  /*subscribeList(){ 
    console.log(this.events);
    this.events.subscribe('imgsEvent', (imgs) => {
       console.log("imgs con evento ",imgs);
       this.pictureList = imgs
    });

  }*/

  getCurrentAcceleration(){

    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
      (error: any) => console.log(error)
    );
  }



}
