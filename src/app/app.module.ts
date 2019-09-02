import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AccueilPageModule } from './accueil/accueil.module';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';

import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { TabsPageModule } from './tabs/tabs.module';
import { MaCollectionPageModule } from './ma-collection/ma-collection.module';
import { CommentairePageModule } from './commentaire/commentaire.module';
import { AidePageModule } from './aide/aide.module';
import {PlusInfoComponent} from './components/plus-info/plus-info.component';
import {ComptePageModule} from './compte/compte.module';
import {ComptePage} from './compte/compte.page';
import {AidePage} from './aide/aide.page';
import {APropsPageModule} from './a-props/a-props.module';
import {APropsPage} from './a-props/a-props.page';
import {Camera} from '@ionic-native/camera/ngx';
import { NotificationComponent } from './params/notification/notification.component';
import { ZoomCarteDirective } from './directives/zoom-carte.directive';
import {EntreprisePage} from './entreprise/entreprise.page';
import {EntreprisePageModule} from './entreprise/entreprise.module';
import {ListeServicePageModule} from './liste-service/liste-service.module';
import {ListeServicePage} from './liste-service/liste-service.page';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import {SingleCartePageModule} from './single-carte/single-carte.module';
import {SingleCartePage} from './single-carte/single-carte.page';
import { GroupeByPipe } from './pipes/groupe-by.pipe';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { InAppBrowser  } from '@ionic-native/in-app-browser/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
// import { WebIntent } from '@ionic-native/web-intent';
import { File } from '@ionic-native/file/ngx';

export  function jwtOtionsFactory(storage) {
  return {
    tokenGetter: () => {
 return storage.get('access_token');
  },
    whiteListedDomains: ['localhost:5000']
  }
}

@NgModule({
  declarations: [AppComponent, PlusInfoComponent],
  entryComponents: [PlusInfoComponent, ComptePage, AidePage, APropsPage, NotificationComponent, EntreprisePage, ListeServicePage,SingleCartePage],
  exports: [],
  imports: [ 
      BrowserModule, //LoadingBarModule, LoadingBarHttpClientModule, LoadingBarRouterModule,
      BrowserAnimationsModule, FilterPipeModule, ComptePageModule, APropsPageModule,EntreprisePageModule,ListeServicePageModule,SingleCartePageModule,
      IonicModule.forRoot(),
      IonicStorageModule.forRoot({
      name: 'carte-visite_db',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOtionsFactory,
        deps: [Storage]
      }
    }),
    AppRoutingModule,
    HttpClientModule,
    TabsPageModule,
    MaCollectionPageModule,
    CommentairePageModule,
    AidePageModule,   
    AccueilPageModule
  ],
  providers: [
    StatusBar,
	SMS,
    SplashScreen,
      Camera,
    SocialSharing,
      OneSignal,  InAppBrowser, FileTransfer , File,
      SpeechRecognition,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PhotoViewer,
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
