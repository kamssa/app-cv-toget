import {Component} from '@angular/core';
import {Platform, ToastController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import {Router, NavigationEnd} from '@angular/router';
import {RegisterService} from './services/register.service';
import {MessageAlerteService} from './services/message-alerte.service';
import {ValiderTokenService} from './services/valider-token.service';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';
import {DataProviderService} from './services/data-provider.service';
import {File} from '@ionic-native/file/ngx';



@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    validerPhotoValue: boolean;
    public appPages = [
        {
            title: 'Accueil',
            url: 'tabs/accueil',
            icon: 'home'
        },
        {
            title: 'Collection',
            url: 'tabs/collection',
            icon: 'list'
        },
        {
            title: 'Faire une Demande',
            url: 'tabs/commentaire',
            icon: 'pricetag'
        },
        {
            title: 'Aide',
            url: 'tabs/aide',
            icon: 'help'
        }
    ];

    public loading = true;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private  auth: RegisterService,
        private router: Router,
		private storage: Storage,
        private mesaageAlerte: MessageAlerteService,
        private validationToken: ValiderTokenService,
        private toastController: ToastController,
        private oneSignal: OneSignal,
        private speechRecognition: SpeechRecognition,
        public dataProviderService: DataProviderService,
        public file: File
    ) {
        this.initializeApp();
        this.dataProviderService.loadData();
        


    }
    ionViewWillEnter(){
        this.dataProviderService.loadData();

        this.dataProviderService.valeurPhoto.subscribe(resp => {
            this.validerPhotoValue = resp;
            console.log('valeur app component de dataphoto dan localS', this.validerPhotoValue);
        });

    }
 ngOnInit() {
	 				
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
				
            let scrollToTop = window.setInterval(function () {
                let pos = window.pageYOffset;
                if (pos > 0) {
                    window.scrollTo(0, 0);
                } else {
                    window.clearInterval(scrollToTop);
                }
            }, 16); 
        });
        this.platform.ready().then(() => {
            if(this.platform.is('android')) {
                this.file.checkDir(this.file.externalRootDirectory, 'Togetme').then(response => {
                    console.log('Directory exists');
                }).catch(err => {
                    console.log('Directory doesn\'t exist');
                    this.file.createDir(this.file.externalRootDirectory, 'Togetme', false).
                    then(response => {
                        console.log('Directory create');
                    }).catch( err => {
                        console.log('Directory no create' + JSON.stringify(err));
                       
                    });
                });
            }
        });
		
    }
	
	
	begining(){
		this.storage.get('ACCESS_BEGIN').then(val => {
			if(val == true){
				this.router.navigate(['tabs/accueil']);
				

				
			}else{
				this.router.navigate(['/presentation']);

			}
        }, error=>{
				this.router.navigate(['/presentation']);

			
		});
	}
    initializeApp() {

        this.splashScreen.show();
        let u = this;

        window.onload = (e) => {
			this.begining();
			
			setTimeout(()=>{
					u.loading = false;
					this.statusBar.styleDefault();
					this.splashScreen.hide();				
			},2000);
        };

        this.platform.ready().then(() => {

// Check permission
            this.speechRecognition.hasPermission()
                .then((hasPermission: boolean) => {
                    console.log('Droit d\'utiliser la reconnaissance vocale ? : ' + hasPermission);
                    if (!hasPermission) {
                        this.requestSpeechRecognitionPersmission();
                    }
                });

        });

        this.oneSignal.startInit('be4d4bcd-059e-4bff-8656-16e2370c8e07', '833949477869');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        this.oneSignal.handleNotificationReceived().subscribe(() => {
            // do something when notification is received
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
            // do something when a notification is opened
        });

        this.oneSignal.endInit();


    }

    private requestSpeechRecognitionPersmission(): void {
// Request permissions
        this.speechRecognition.requestPermission()
            .then(
                () => console.log('Granted'),
                () => console.log('Denied')
            );
    }


    async presentToast(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 4000
        });
        toast.present();

    }
}
