import {Component, OnInit} from '@angular/core';

import {Platform, ToastController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {Router, NavigationEnd} from '@angular/router';
import {RegisterService} from './services/register.service';
import {MessageAlerteService} from './services/message-alerte.service';
import {ValiderTokenService} from './services/valider-token.service';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';

const TOKEN_KEY = 'access_token';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
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
        private mesaageAlerte: MessageAlerteService,
        private validationToken: ValiderTokenService,
        private toastController: ToastController,
        private oneSignal: OneSignal,
        private speechRecognition: SpeechRecognition
    ) {
        this.initializeApp();
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
		
    }
    initializeApp() {

        this.splashScreen.show();
        let u = this;

        window.onload = (e) => {
            u.loading = false;
            this.statusBar.styleDefault();
            this.splashScreen.hide();
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

    logout() {
        this.validationToken.authenticationState.subscribe(state => {
            if (state) {
                this.auth.logout();
                this.presentToast('déconnexion reussi');
                this.router.navigate(['tabs/accueil']);
            } else {
                // this.presentToast('vous devez vous connecter');
                this.router.navigate(['tabs/connexion']);

            }
        });

    }

    async presentToast(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 4000
        });
        toast.present();

    }
}
