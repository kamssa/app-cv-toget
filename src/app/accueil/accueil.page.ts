import { ValiderTokenService } from './../services/valider-token.service';
import {Component, ChangeDetectorRef, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModeleService } from '../services/modele.service';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage';
import {RegisterService} from '../services/register.service';
import { AppConfig } from '../parametre/config';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {MessageAlerteService} from '../services/message-alerte.service';
import { ToastController, Platform } from '@ionic/angular';
import {ModalImagePage} from '../modal-image/modal-image.page';
import {ExampleCarteComponent} from '../components/example-carte/example-carte.component';
import {OutilService} from '../parametre/outil.service';
import {DataProviderService} from '../services/data-provider.service';
@Component({
  selector: 'app-accueil',
  templateUrl: 'accueil.page.html',
  styleUrls: ['accueil.page.scss'],
})
export class AccueilPage implements  OnInit{
    validerTokenValue: boolean;
    validerPhotoValue: boolean;
    public counter = 0;
	public link_img = AppConfig.image_url;
	public cartes:any = [];
image = [{
    image: 'assets/carte/carte1.png',
    title: 'Modèle de carte',
    dev: '',

}, {
    image: 'assets/carte/carte2.png',
    title: 'Modèle de carte',
    dev: '',

}, {
    image: 'assets/carte/carte3.png',
    title: 'Modèle de carte',
    dev: '',

}, {
    image: 'assets/carte/carte4.png',
    title: 'Modèle de carte',
    dev: '',

}, {
    image: 'assets/carte/carte5.png',
    title: 'Modèle de carte',
    dev: '',

}, {
    image: 'assets/carte/carte6.png',
    title: 'Modèle de carte',
    dev: '',

},
{
    image: 'assets/carte/carte7.png',
    title: 'Modèle de carte',
    dev: '',

},
{
    image: 'assets/carte/carte8.png',
    title: 'Modèle de carte',
    dev: '',

},{
    image: 'assets/carte/carte9.png',
    title: 'Modèle de carte',
    dev: '',

}];
public profil:any=[];
    private modeles: any;

constructor(private modalController: ModalController,
    private modelService: ModeleService,
    private router: Router,
    private messageAlert: MessageAlerteService,
              private storage: Storage,
              private auths: RegisterService,
    private auth: ValiderTokenService, private localNotifications: LocalNotifications,
    private platform: Platform, public toastCtrl: ToastController, private outil : OutilService,
    private validerToken: ValiderTokenService, private changeDetectorRef: ChangeDetectorRef,
    public dataProviderService: DataProviderService) {

        this.getModele();
        this.profil;

this.localNotifications.schedule({
   text: 'Delayed ILocalNotification',
   trigger: {at: new Date(new Date().getTime() + 3600)},
   led: 'FF0000',
   sound: null
});
   this.platform.backButton.subscribe(() => {
	   this.testeur();
    if (this.router.url.startsWith("/tabs/accueil")) {

			if (this.counter == 0) {
			  this.counter++;
			  this.presentToast();
			  setTimeout(() => { this.counter = 0 }, 3000);
			} else {
				navigator['app'].exitApp();
			}
    }
  });

  this.getElementUSer();
    }

     ngOnInit() {

     }
	
	testeur(){
		
		this.storage.get('ACCESS_BEGIN').then(val => {
			if(val == true){
				this.router.navigate(['tabs/accueil']);
				

				
			}
        }, error => {


			
		});
	}

    ionViewWillEnter() {
       
        this.validerToken.authenticationState.subscribe(resp => {
            this.validerTokenValue = resp;

            this.getElementUSer();

            this.changeDetectorRef.detectChanges();
             });
        this.dataProviderService.valeurPhoto.subscribe(resp => {
            this.validerPhotoValue = resp;

        });

        this.getModele();
         
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
     this.dataProviderService.loadDataAccueil().then(value => {
         if (value) {
             this.profil = JSON.parse(value);
         }
     });

	}
	onLaodCarteVisite(key: any, type: any) {

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
  
    getRouteCollection() {
      this.router.navigate(['/connexion']);
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
        this.router.navigateByUrl('/connexion');
    }

}

    openPreviewZOOM(img, allData:any={}, suppr=false, active) {
		this.outil.openPreview(img, allData, suppr, active);
  }
  
  
  getModele(){

                this.auths.modele().subscribe(resp => {
                       if(resp['status'] === 200){
                           this.cartes = resp;

						   this.cartes['data'] = resp['data'].map(x => (x.model_statut == 1)? x : '');
						   this.cartes['data'] = this.cartes['data'].filter( function(val){return val !== ''} );

						   
                       } else {
                          this.presentToasts('Une erreur est survenue. Veuillez réessayer ');
                       }

                    },err => {
                         this.presentToasts('erreur, Veuillez verifier votre connexion internet! ');
                    });

            
  }
  
  
        async presentToasts(text: string) {
		
        const toast = await this.toastCtrl.create({
            message: text,
            duration: 2000
        });
        toast.present();

    }
	
	
	
	 async onModalPageEntreprise() {

        const modal = await this.modalController.create({
            component: ExampleCarteComponent,
        });
        return await modal.present();

}
}
