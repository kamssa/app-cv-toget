import { ValiderTokenService } from './../services/valider-token.service';
import {Component,ChangeDetectorRef, Input, OnInit} from '@angular/core';
import { MbscScrollViewOptions } from '@mobiscroll/angular';
import { MaCollectionPage } from '../ma-collection/ma-collection.page';
import { ModalController } from '@ionic/angular';
import { ModeleService } from '../services/modele.service';
import { MbscCardOptions } from '@mobiscroll/angular';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage';
import {RegisterService} from '../services/register.service';
import { AppConfig } from '../parametre/config';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {MessageAlerteService} from '../services/message-alerte.service';
import { ToastController, Platform } from '@ionic/angular';
import {ModalImagePage} from '../modal-image/modal-image.page';
import {OutilService} from '../parametre/outil.service';
@Component({
  selector: 'app-accueil',
  templateUrl: 'accueil.page.html',
  styleUrls: ['accueil.page.scss'],
})
export class AccueilPage implements  OnInit{
    validerTokenValue: boolean;
  keyword: any;
  public counter=0;
	public link_img = AppConfig.image_url;
    private modeles: any;
    sliderViewOpts = {
        zoom: false,
        slidesPreview: 1.5,
        centerSlides: true,
        spaceBetween: 20,
        itemWidth: 134,
        snap: false,
      }
     
     ngOnInit() {
    
     }

    scrollViewOptions: MbscScrollViewOptions = {
    layout: 'fixed',
    itemWidth: 134,
    snap: false
};

image = [{
    image: 'assets/carte/carte1.png',
    title: 'Modèle de carte',
    dev: '',
    // rank: 1
}, {
    image: 'assets/carte/carte2.png',
    title: 'Modèle de carte',
    dev: '',
    // rank: 
}, {
    image: 'assets/carte/carte3.png',
    title: 'Modèle de carte',
    dev: '',
    // rank: 
}, {
    image: 'assets/carte/carte4.png',
    title: 'Modèle de carte',
    dev: '',
    // rank: 
}, {
    image: 'assets/carte/carte5.png',
    title: 'Modèle de carte',
    dev: '',
    // rank: 
}, {
    image: 'assets/carte/carte6.png',
    title: 'Modèle de carte',
    dev: '',
    // rank: 
},
{
    image: 'assets/carte/carte7.png',
    title: 'Modèle de carte',
    dev: '',
    // rank: 
},
{
    image: 'assets/carte/carte8.png',
    title: 'Modèle de carte',
    dev: '',
    // rank: 
},{
    image: 'assets/carte/carte9.png',
    title: 'Modèle de carte',
    dev: '',
    // rank: 
}];
public profil:any=[];
// images = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'];
constructor(private modalController: ModalController,
    private modelService: ModeleService,
    private router: Router,
    private messageAlert: MessageAlerteService,
              private storage: Storage,
              private auths: RegisterService, 
    private auth: ValiderTokenService, private localNotifications: LocalNotifications,
    private platform: Platform, public toastCtrl: ToastController, private outil : OutilService,
    private validerToken: ValiderTokenService, private changeDetectorRef: ChangeDetectorRef) {
		
        this.modelService.getUpload();
        
		
this.localNotifications.schedule({
   text: 'Delayed ILocalNotification',
   trigger: {at: new Date(new Date().getTime() + 3600)},
   led: 'FF0000',
   sound: null
});
   this.platform.backButton.subscribe(() => {
    if (this.counter == 0) {
      this.counter++;
      this.presentToast();
      setTimeout(() => { this.counter = 0 }, 3000);
    } else {
        navigator['app'].exitApp();
    }
  });
  
  this.getElementUSer();
    }
    ionViewWillEnter() {
        this.validerToken.authenticationState.subscribe(resp =>{
            this.validerTokenValue = resp;
            console.log('ionViewWillEnter', this.validerTokenValue)
            this.getElementUSer();
            this.changeDetectorRef.detectChanges();
             });
         
         
	}
    async presentToast() {
        const toast = await this.toastCtrl.create({
          message: "Appuyer une seconde fois pour quitter",
          duration: 3000,
          position: "middle"
        });
        toast.present();
      }
    getElementUSer() {
		        this.storage.get('access_data').then(resp => {
                  this.profil = resp;
                  console.log(this.profil);
                });
               
	}

openPreview(Image) {
	this.modelService.getUpload();
    this.modalController.create({
      component: MaCollectionPage,
      componentProps: {
        img: Image
      }
    }).then(modal => modal.present());

  }
    onLaodCarteVisite(key: any, type: any) {
        console.log('verifier la valeur de entreprise:', type);
        console.log('verifier la valeur key:', key);
        if (!key) {
            this.messageAlert.presentAlert('Attention','Renseigner la recherche');
        } else {
            this.modelService.getUpload();
            if (type==='entreprise'){
                this.router.navigate(['./collection'],{queryParams: {'search':key,'type':type}});
            }
            if (type==='particulier'){
                this.router.navigate(['./collection'], {queryParams: {'search': key, 'type': type}});
            } if (type==='all'){
                this.router.navigate(['./collection'], {queryParams: {'search': key, 'type': type}});
                
            }
            this.auth.checkToken();
        }


    }
  
 getItemsClick(ev: any) {
          console.log('test',ev);
          if (!ev) {
              this.messageAlert.presentAlert('Attention','Renseigner la recherche');
          }  else {
              this.modelService.getUpload();
              // Reset items back to all of the items
              const val = ev;
              this.keyword = val;
              this.router.navigate(['./collection'],{queryParams: {'search':val,'type':'all'}});
          }

    }

    getItems(ev: any) {
    if (!ev) {
        this.messageAlert.presentAlert('Attention','Renseigner la recherche');
    } else {
        this.modelService.getUpload();
        // Reset items back to all of the items
        const val = ev.target.value;
        this.keyword = val;
        this.router.navigate(['./collection'],{queryParams: {'search':this.keyword,'type':'all'}});
    }

     }
    getRouteCollection() {
      this.router.navigate(['/connexion']);
      }
      getRouteAide() {
          this.router.navigate(['/aide']);
      }
      onAllCarte() {
        this.router.navigate(['./collection'],{queryParams: {'search':'','type':''}});

 }
 async onModalPage() {
    console.log(this.validerToken.authenticationState.value);
    if (this.validerToken.authenticationState.value) {
        const modal = await this.modalController.create({
            component: ModalImagePage,
        });
        return await modal.present();
    } else {

        console.log('connexion');
       // this.modalController.dismiss();
        this.router.navigateByUrl('/connexion');
    }

}

    openPreviewZOOM(img, allData:any={}, suppr=false, active) {
		this.outil.openPreview(img, allData, suppr, active);
  }
}
