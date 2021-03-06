import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { UtilitiesProvider } from '../providers/utilities/utilities';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FIREBASE_CONFIG } from './app.firebase.config';

import { IonicStorageModule } from '@ionic/storage';
import { Camera } from "@ionic-native/camera";
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { DeviceMotion} from '@ionic-native/device-motion';

@NgModule({
  declarations: [
    MyApp,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicStorageModule.forRoot(),
    IonicImageViewerModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    IonicStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    DeviceMotion,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    UtilitiesProvider,
    UtilitiesProvider,
    FirebaseProvider
  ]
})
export class AppModule {}
