import {Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef} from '@angular/core';
import {
    ModalController,
    PopoverController,
    NavParams,
    ActionSheetController,
    AlertController,
    ToastController,
    LoadingController,
    Platform
} from '@ionic/angular';
import {ListeServicePage} from '../liste-service/liste-service.page';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {ModeleService} from '../services/modele.service';
import {Storage} from '@ionic/storage';
import {RegisterService} from '../services/register.service';
import {Objet} from '../models/objet';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import {DataProviderService} from '../services/data-provider.service';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';

const DATA_KEY = 'access_data';
const TOKEN_KEY = 'access_token';


@Component({
    selector: 'app-entreprise',
    templateUrl: './entreprise.page.html',
    styleUrls: ['./entreprise.page.scss'],
})
export class EntreprisePage implements OnInit {


    @ViewChild('slider', {static: false}) slider: ElementRef;

    img: any;
    allData: any;
    suppr: boolean;
    active: boolean;
    privated: boolean;
    id: number;
    personne: number;
    requestP: number;

    collection_id: number;

    data = [];
    objet: any = '';
    downloadText: any;
    fileTransfert: FileTransferObject;

    sliderOpts = {
        zoom: {
            maxRatio: 5
        }
    };


    constructor(private  registerService: RegisterService,
                private toastController: ToastController, private socialSharing: SocialSharing,
                private modalController: ModalController, public popoverController: PopoverController,
                private navParams: NavParams, public actionSheetController: ActionSheetController,
                public alertController: AlertController, public modeleService: ModeleService,
                private storage: Storage, private changeDetectorRef: ChangeDetectorRef,
                private route: ActivatedRoute, private plt: Platform, private localNotifications: LocalNotifications,
                private router: Router, private transfer: FileTransfer,
                private file: File, private loadingCtl: LoadingController,
                public dataProviderService: DataProviderService,
                private platform: Platform,
                private androidPermissions: AndroidPermissions) {
        this.img;

    }


    ngOnInit() {
        this.img = this.navParams.get('img');
        this.allData = this.navParams.get('allData');
        this.suppr = this.navParams.get('suppr');
        this.active = this.navParams.get('active');
        this.privated = this.navParams.get('privated');
        this.id = this.navParams.get('id');
        this.personne = this.navParams.get('personne');
        this.requestCollection();
    }

    zoom(zoomIn: boolean) {
        let zoom = this.slider.nativeElement.swiper.zoom;
        if (zoomIn) {
            zoom.in();
        } else {
            zoom.out();
        }
    }


    close() {
        this.modalController.dismiss();

    }


    requestCollectionPrivate() {
        this.showLoading();
        this.storage.get(TOKEN_KEY).then(resp => {
            if (!resp) {
                this.allData.private = 0;

            }
        });

        this.modeleService.searchCarteSinglePersonnelUpdate(this.allData.id_user).subscribe(response => {
                if (response && response['status'] == 200) {
                    if (response['response'] == true) {
                        this.allData.private = 1;
                    }

                    if (response['response'] == false) {
                        this.allData.private = 0;
                    }

                } else {
                    this.allData.private = 0;

                }
                this.showLoading(1);
            },
            error => {
                this.allData.private = 0;
                this.presentToast('Erreur de récuperation. Verifier votre connexion internet !');
                this.showLoading(1);
            });
    }

    async presentAlertCollectionPrivate() {
        let text = '';
        if (this.allData.private == 1) {
            text = 'Voulez-vous rendre cette carte publique ?';
        } else {
            text = 'Voulez-vous rendre cette carte privée ?';
        }
        const alert = await this.alertController.create({
            subHeader: text,
            buttons: [{
                text: 'Non',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    console.log('Confirm Cancel');
                }
            }, {
                text: 'Oui',
                handler: () => {
                    console.log('Confirm Ok');

                    this.requestCollectionPrivate();
                }
            }]
        });

        await alert.present();
    }


    requestCollection() {

        this.storage.get(TOKEN_KEY).then(resp => {
            if (!resp) {
                this.requestP = 0;
            }
        });
        this.data = this.dataProviderService.data;
        this.id = this.data['id_user'] ? this.data['id_user'] : this.id;
        if (this.data) {
            this.modeleService.searchCarteSingle(this.id, this.personne).subscribe(response => {
                    if (response && response['status'] == 200) {
                        if (response['data'].status == true) {
                            this.requestP = 1;
                            console.log(response['data'].id);
                            this.collection_id = response['data'].id;
                        }

                        if (response['data'].status == false) {
                            this.requestP = 0;
                        }
                    } else {
                        this.requestP = 0;
                    }
                },
                error => {
                    this.requestP = 0;
                });
        }


    }


    requestDemande(data: any = {}) {


        if (data) {
            this.registerService.demande(data).subscribe(response => {
                    if (response && response['status'] == 200) {
                        this.presentToast('Succès, Votre demande a été envoyée et est en cours de traitement !');
                    } else {

                        this.presentToast('Erreur. Le serveur met trop de temps a repondre veuillez réessayer !');
                    }
                },
                error => {

                    this.presentToast('Erreur. Verifier votre connexion internet !');
                });
        }


    }


    enregistrer() {

        this.storage.get(TOKEN_KEY).then(resp => {
            if (!resp) {
                this.presentAlertConnexion('Désolé', 'Vous devez vous connecter pour avoir accès à cette fonctionnalité !');
            }
        });
        this.storage.get(DATA_KEY).then(data => {
            if (data) {
                this.id = data['id_user'] ? data['id_user'] : this.id;
                this.objet = new Objet(this.id, this.personne, 1);
                this.registerService.collection(this.objet).subscribe(resp => {

                    if (resp['status'] === 200) {
                        this.requestP = 1;
                        this.presentToast('Carte ajoutée avec succes');
                        this.collection_id = resp['response'];
                    } else {
                        this.presentToast('Erreur de traitement  !');
                    }

                }, err => {
                    this.presentToast('Erreur de connexion.');
                });
            }
        });


    }


    delete() {
        7;
        this.storage.get(TOKEN_KEY).then(resp => {
            if (!resp) {
                this.presentAlertConnexion('Désolé', 'Vous devez vous connecter pour avoir accès à cette fonctionnalité !');

            }
        });
        this.storage.get(DATA_KEY).then(data => {
            if (data) {

                this.modeleService.delete(this.collection_id).subscribe(resp => {

                    if (resp['status'] === 200 && resp['response'] === true) {
                        this.requestP = 0;
                        this.presentToast('Carte supprimé avec succes');
                        this.registerService.comunication.push(this.collection_id + 'ma-collection');
                        7;
                        this.close();
                        7;

                    } else {
                        this.presentToast('Erreur, veuillez réessayer svp !.');
                    }

                }, err => {
                    this.presentToast('Erreur de connexion.');
                });
            }
        });


    }

    async presentToast(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000
        });
        toast.present();

    }

    async presentAlertCollection() {
        const alert = await this.alertController.create({
            subHeader: 'Voulez-vous ajouter cette carte à votre collection personnelle ?',
            buttons: [{
                text: 'Non',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    console.log('Confirm Cancel');
                }
            }, {
                text: 'Oui',
                handler: () => {
                    console.log('Confirm Ok');

                    this.enregistrer();
                }
            }]
        });

        await alert.present();
    }


    async presentAlertCollectionMessage(text) {
        const alert = await this.alertController.create({
            subHeader: 'Element déja ajouter a votre collection !',
            buttons: [{
                text: 'annuler',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    console.log('Confirm Cancel');
                }
            }, {
                text: 'aller à ma collection',
                handler: () => {
                    console.log('Confirm Ok');
                    this.close();
                    this.router.navigate(['/tabs/ma-collection']);

                }
            }]
        });

        await alert.present();
    }


    async presentAlertCollectionDelete() {
        const alert = await this.alertController.create({
            subHeader: 'Voulez-vous supprimer cette carte à votre collection personnelle ?',
            buttons: [{
                text: 'Non',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    console.log('Confirm Cancel');
                }
            }, {
                text: 'Oui',
                handler: () => {
                    console.log('Confirm Ok');

                    this.delete();

                }
            }]
        });

        await alert.present();
    }

    async presentAlertConnexion(title, text) {
        const alert = await this.alertController.create({
            header: title,
            subHeader: text,
            buttons: [{
                text: 'Annulé',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    console.log('Confirm Cancel');
                }
            }, {
                text: 'connexion',
                handler: () => {
                    console.log('Confirm Ok');
                    this.close();
                    this.router.navigate(['/connexion']);

                }
            }]
        });

        await alert.present();
    }


    async presentActionSheet() {
        let u = this;
        let Personnel = (this.allData.person_tel_perso) ? this.allData.person_tel_perso : 'Aucun';
        let Professionnel = (this.allData.person_tel_profe) ? this.allData.person_tel_profe : 'Aucun';
        let email = (this.allData.person_email) ? this.allData.person_email : 'Aucun';
        let siteW = '';
        if (this.allData.id_entrep == -1) {
            siteW = (this.allData.person_site_web) ? this.allData.person_site_web : 'Aucun';

        } else {
            siteW = (this.allData.entreprise_site_web) ? this.allData.entreprise_site_web : 'Aucun';

        }
        const actionSheet = await this.actionSheetController.create({
            header: 'Plus d\'options',
            buttons: [{
                text: siteW,
                icon: 'git-network',
                handler: () => {
                    if (siteW !== 'Aucun') {

                        // window.location.href=siteW;
                        window.open('http://' + siteW);

                    } else {
                        alert('Action non autoriser !');
                    }
                }
            }, {
                text: 'Signaler un problème',
                icon: 'bug',
                handler: () => {
                    window.open('https://play.google.com/store/apps/details?id=io.ionic.toget_me&hl=fr');
                }
            }, {
                text: 'Fermer',
                icon: 'close',
                role: 'cancel',
                handler: () => {

                }
            }]
        });
        await actionSheet.present();
    }

    share(text = null, image = null, link = null) {
        // let linkShare = "hhhhhhhhhh";
        this.socialSharing.share(text, image, link)
            .then(() => {
                // console.log(event);
                this.presentToast('Element partagé avec succès !');
            }).catch(() => {

            this.presentToast('Une Erreur est survenue pendant l\'opération !');
        });

    }


    async presentAlertPrompt() {
        let aaa = this.img;
        const alert = await this.alertController.create({
            header: 'Formulaire de Demande',
            message: 'Modèle choisi : <img src="' + aaa + '"> ',
            mode: 'ios',
            inputs: [
                {
                    name: 'nom',
                    type: 'text',
                    placeholder: 'Nom complet exemple : jhon doe'
                },
                {
                    name: 'telephone',
                    type: 'number',
                    placeholder: 'Téléphone exemple : 02020202'
                },
                {
                    name: 'email',
                    type: 'text',
                    placeholder: 'Email : jhondoe@exemple.com'
                }
            ],
            buttons: [
                {
                    text: 'annuler',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Valider',
                    handler: (data) => {
                        console.log('Confirm Ok', '');
                        if (typeof data != null) {

                            if (this.isEmail(data.email) == false && data.nom.length == 0 && data.telephone.length == 0) {
                                this.presentToast('Erreur. Veuillez remplir les champs svp !');
                                return false;
                            }

                            if (data.nom.length < 3) {
                                this.presentToast('Erreur. champs nom mini 3 caractères !');
                                return false;
                            }

                            if (data.telephone.length < 8 && !isNaN(data.telephone)) {
                                this.presentToast('Erreur. Verifier votre telephone svp !');
                                return false;
                            }


                            if (this.isEmail(data.email) == false) {
                                this.presentToast('Erreur. Verifier votre email svp !');
                                return false;
                            }

                            let modele: any = {id_modele: this.allData.id_modele};
                            let all: any = Object.assign(modele, data);
                            console.log(all);
                            this.requestDemande(all);
                        } else {
                            this.presentToast('Erreur. Veuillez remplir les champs svp !');
                            return false;
                        }
                    }
                }
            ]
        });

        await alert.present();
    }

    isEmail(search: string): boolean {
        let serchfind: boolean;

        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        serchfind = regexp.test(search);

        console.log(serchfind);
        return serchfind;
    }


    async presentActionSheetCall() {


        let u = this;
        let Personnel = (this.allData.person_tel_perso) ? this.allData.indicatif_pays + '' + this.allData.person_tel_perso : 'Aucun';
        let Professionnel = (this.allData.person_tel_profe) ? this.allData.indicatif_pays + '' + this.allData.person_tel_profe : 'Aucun';
        let email = (this.allData.person_email) ? this.allData.person_email : 'Aucun';
        let siteW = '';
        if (this.allData.id_entrep == -1) {
            siteW = (this.allData.person_site_web) ? this.allData.person_site_web : 'Aucun';

        } else {
            siteW = (this.allData.entreprise_site_web) ? this.allData.entreprise_site_web : 'Aucun';

        }


        const actionSheet = await this.actionSheetController.create({
            header: 'Option d\'appel',
            buttons: [{
                text: '+' + Personnel,
                icon: 'call',
                cssClass: 'button-cam',
                handler: () => {
                    if (Personnel !== 'Aucun') {

                        window.location.href = 'tel:00' + Personnel;
                    } else {
                        alert('Action non autoriser !');
                    }
                }
            }, {
                text: '+' + Professionnel,
                icon: 'call',
                handler: () => {
                    if (Professionnel !== 'Aucun') {

                        window.location.href = 'tel:00' + Professionnel;
                    } else {
                        alert('Action non autoriser !');
                    }
                }
            }, {
                text: 'Fermer',
                icon: 'close',
                role: 'cancel',
                handler: () => {

                }
            }]
        });
        await actionSheet.present();
    }


    async presentActionSheetMail() {


        let email = (this.allData.person_email) ? this.allData.person_email : 'Aucun';
        let siteW = '';
        if (this.allData.id_entrep == -1) {
            siteW = (this.allData.person_site_web) ? this.allData.person_site_web : 'Aucun';

        } else {
            siteW = (this.allData.entreprise_site_web) ? this.allData.entreprise_site_web : 'Aucun';

        }


        const actionSheet = await this.actionSheetController.create({
            header: 'Option de mail',
            buttons: [{
                text: email,
                icon: 'mail',
                handler: () => {
                    if (email !== 'Aucun') {

                        window.location.href = 'mailto:' + email;
                    } else {
                        alert('Action non autoriser !');
                    }
                }
            }, {
                text: 'Fermer',
                icon: 'close',
                role: 'cancel',
                handler: () => {

                }
            }]
        });
        await actionSheet.present();
    }


    async presentActionSheetShare(link) {


        let u = this;
        const actionSheet = await this.actionSheetController.create({
            header: 'Option de partage',
            buttons: [{
                text: 'Partager l\'image de la carte de visite',
                icon: 'image',
                handler: () => {
                    console.log(link);
                    this.share(this.allData.person_nom_phonetique, link, link);
                }
            },

                {
                    text: 'Fermer',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {

                    }
                }]
        });
        await actionSheet.present();
    }


    async showLoading(ext = 0) {
        let loading = await this.loadingCtl.create({
            message: 'Chargement...',
            showBackdrop: false,
            spinner: 'lines-small'
        });
        if (ext == 1) {

            loading.present();
        }
        if (ext == 1) {
            loading.dismiss();
        }

    }


    async downloadImg() {

        this.checkPermissions();
        this.fileTransfert = this.transfer.create();
        await this.fileTransfert.download(this.img, this.file.externalRootDirectory + '/Togetme/' + this.img)
            .then((data) => {

                this.presentToast('Téléchargement effectué avec succès!');
                this.downloadText = '';

            }, (error) => {

                this.presentToast('Echèc de téléchargement, réessayer');
            });


    }


    checkPermissions() {
        this.androidPermissions.requestPermissions(
            [
                this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
                this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
            ]
        );
    }


}
