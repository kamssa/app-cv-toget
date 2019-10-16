import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModeleService} from '../services/modele.service';
import {IonInfiniteScroll, AlertController, ToastController, LoadingController} from '@ionic/angular';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {ValiderTokenService} from '../services/valider-token.service';
import {Storage} from '@ionic/storage';
import {RegisterService} from '../services/register.service';
import {Objet} from '../models/objet';
import {BehaviorSubject} from 'rxjs';
import {DataProviderService} from '../services/data-provider.service';


const TOKEN_KEY = 'access_token';
const HISTORIQUE_KEY = 'access_Historique';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.page.html',
    styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {


    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
    modeles: any = [];
    private search: any;
    user: any;
    private type: any;
    id_personne: any;
    id_user: any;
    objet: any = '';
    content: any;
    data = [];
    verifierRetour = new BehaviorSubject(false);
    public loading: any;


    message: string = null;
    file: string = null;
    link: string = null;
    subject: string = null;

    toogleclassElementAFF = false;
    service: any = [];
    serviceLoading = true;
    userFilter: any = {person_service: ''};
    catName = '';
    typeElement = '';
    current = 0;
    currentEntrep = 0;
    size = 5;
    sizeOffset = 5;
    endpage = false;
    rekAll = 0;
    profil: any;
    Categorie: any = [{name: 'Particulier'}, {name: 'ONG'}, {name: 'Entreprise'}];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private  modeleService: ModeleService,
                private  registerService: RegisterService,
                private socialSharing: SocialSharing,
                private validerToken: ValiderTokenService,
                private storage: Storage,
                private alertCtrl: AlertController,
                private toastController: ToastController,
                private loadingCtl: LoadingController,
                private changeDetectorRef: ChangeDetectorRef,
                private   dataProviderService: DataProviderService) {

    }

    ionViewWillEnter() {
        this.ActiveCat('Tout', 0);
        this.showLoading();
        this.requestSearch();
        this.profil = this.dataProviderService.data;
        console.log(this.profil);
        this.changeDetectorRef.detectChanges();
    }

    saveHistorique() {
        let ladate = new Date();
        let heure = ladate.getHours() + ':' + ladate.getMinutes() + ':' + ladate.getSeconds();
        let date1 = ladate.getDate();
        let date2 = ladate.getMonth();
        let date3 = ladate.getFullYear();
        let dataGlobal: any = [];
        this.storage.get(HISTORIQUE_KEY).then(val => {
            if (val) {
                let data: any = [{
                    lien: '/collection?search=' + this.search + '&type=' + this.type,
                    recherche: this.search,
                    type: this.type,
                    date: date1 + '/' + (date2 + 1) + '/' + date3,
                    heure: heure
                }];
                dataGlobal = val.concat(data);
                this.storage.set(HISTORIQUE_KEY, dataGlobal);
                dataGlobal = [];
            } else {
                let data: any = [{
                    lien: '/collection?search=' + this.search + '&type=' + this.type,
                    recherche: this.search,
                    type: this.type,
                    date: date1 + '/' + (date2 + 1) + '/' + date3,
                    heure: heure
                }];
                this.storage.set(HISTORIQUE_KEY, data);
            }
        }, error => {


        });
    }

    requestSearch(param = '', element = '', infiniteScroll?) {
        let u = this;
        u.toogleclassElementAFF = true;

        this.route.queryParams.subscribe(res => {
            if (!res) {
                u.serviceLoading = false;
            } else {

                this.search = element.length != 0 ? element.toLowerCase() : res['search'].toLowerCase();


                this.type = param.length != 0 ? param.toLowerCase() : res['type'].toLowerCase();

                this.saveHistorique();

                switch (this.type) {
                    case  'entreprise':
                        this.infiniteScroll.disabled = true;

                        this.modeleService.searchE(this.search, this.current, 10000).subscribe(response => {

                            if (response['status'] === 200) {
                                if (this.modeles.data) {
                                    if (this.modeles.data.length > 0) {
                                        this.modeles.data = this.modeles.data.concat(response['data']);

                                    }
                                } else {

                                    this.modeles = response;
                                }

                                this.currentEntrep += 10000;

                                if (response['data'].length > 0) {
                                    u.serviceLoading = false;
                                    this.verifierRetour.next(true);

                                }

                            }

                            if (this.rekAll == 0) {

                                this.modeleService.searchE(this.search, 0, 1000000).subscribe(response => {
                                    if (response['status'] === 200) {
                                        if (response['data']) {
                                            this.service = response['service'];
                                            this.rekAll = response['data'].length;
                                        }
                                    }
                                }, error => {
                                });
                            }

                            console.log(this.modeles);
                            if (infiniteScroll) {
                                infiniteScroll.target.complete();
                            }
                            this.loadingCtl.dismiss().then(a => console.log('dismissed'));


                        }, error => {
                            this.presentAlertVerifierConnexion('Désolé', 'Verifier votre connexion');
                            u.serviceLoading = false;
                            this.loadingCtl.dismiss().then(a => console.log('dismissed'));
                        });
                        break;
                    case  'particulier':
                        this.infiniteScroll.disabled = false;
                        this.service = [];
                        this.toogleclassElementAFF = false;
                        this.modeleService.searchP(this.search, this.current, this.size).subscribe(response => {
                            if (response['status'] === 200) {
                                console.log('afficher particulier le reour de collection status' + response['status']);
                                if (this.modeles.data) {
                                    if (this.modeles.data.length > 0) {
                                        this.modeles.data = this.modeles.data.concat(response['data']);

                                    }
                                } else {

                                    this.modeles = response;
                                }
                                this.current = this.sizeOffset;
                                this.sizeOffset += 5;
                                this.modeleService.messageErreur;
                                this.verifierRetour.next(true);
                                if (infiniteScroll) {
                                    infiniteScroll.target.complete();
                                }
                            }
                            if (this.rekAll == 0) {

                                this.modeleService.searchP(this.search, 0, 1000000).subscribe(response => {
                                    if (response['status'] === 200) {
                                        if (response['data']) {
                                            this.rekAll = response['data'].length;
                                        }
                                    }
                                }, error => {
                                });
                            }
                        }, error => {
                            this.presentAlertVerifierConnexion('Désolé', 'Verifier votre connexion');
                        });

                        break;
                    case  'all':

                        this.infiniteScroll.disabled = false;
                        this.service = [];
                        this.toogleclassElementAFF = false;
                        this.modeleService.searchAll(this.search, this.current, this.size).subscribe(response => {

                            if (response['status'] === 200) {
                                if (this.modeles.data) {
                                    if (this.modeles.data.length > 0) {
                                        this.modeles.data = this.modeles.data.concat(response['data']);


                                    }
                                } else {

                                    this.modeles = response;
                                }
                                this.current = this.sizeOffset;
                                this.sizeOffset += 5;
                                this.modeleService.messageErreur;
                                this.verifierRetour.next(true);
                                if (infiniteScroll) {
                                    infiniteScroll.target.complete();
                                }
                            } else {
                                if (infiniteScroll) {
                                    infiniteScroll.target.complete();
                                }

                            }
                            if (this.rekAll == 0) {

                                this.modeleService.searchAll(this.search, 0, 1000000).subscribe(response => {
                                    if (response['status'] === 200) {
                                        if (response['data']) {
                                            this.rekAll = response['data'].length;


                                        }
                                    }
                                }, error => {
                                });
                            }

                        }, error => {
                            this.presentAlertVerifierConnexion('Désolé', 'Verifier votre connexion svp !');
                        });
                        break;
                    default:
                        this.toogleclassElementAFF = false;
                        this.modeles = {'status': 200, 'data': []};
                        console.log('verifier le reour du modeles', this.modeles);
                        this.modeleService.messageErreur;
                        this.verifierRetour.next(true);

                        break;

                }


            }
        }, error => {
            u.serviceLoading = false;
        });


    }


    loadMore(infiniteScroll) {
        setTimeout(() => {
            this.requestSearch(this.type, this.search, infiniteScroll);

            if (this.modeles.data && this.rekAll == this.modeles.data.length) {
                this.infiniteScroll.disabled = true;
                this.endpage = true;
            }
        }, 500);
    }


    ngOnInit() {

    }

    loadFilterData(param, id) {
        this.userFilter.person_service = param;

        let elClass = document.getElementsByClassName('element_');
        for (let index = 0; index < elClass.length; ++index) {
            elClass[index].setAttribute('color', 'light');
        }

        let el = document.getElementById('element_' + id);
        el.setAttribute('color', 'warning');

    }

    ActiveCat(param, id, activate = false) {

        this.modeles = [];
        this.service = [];
        this.catName = param;
        this.current = 0;
        this.sizeOffset = 5;
        this.rekAll = 0;

        let elClass = document.getElementsByClassName('cat_');
        for (let index = 0; index < elClass.length; ++index) {
            elClass[index].classList.remove('sidActivate');

        }

        let el = document.getElementById('cat_' + id);
        el.classList.add('sidActivate');

        if (param == 'Tout') {
            param = 'all';
        }
        this.typeElement = param;

        if (activate == true) {
            this.infiniteScroll.disabled = false;
            this.requestSearch(param, this.search);
        }


    }


    RequestSending(type, even) {
        this.modeles = [];
        this.service = [];
        this.current = 0;
        this.sizeOffset = 5;
        this.rekAll = 0;
        this.requestSearch(type, even);

    }

    share(event) {

        this.socialSharing.share(event.value)
            .then(() => {
                console.log(event.value);
            }).catch(() => {

        });
    }

    valider() {

        this.registerService.collection(this.objet).subscribe(resp => {
            this.modeles = resp;
        }, err => {
            console.log(err);
        });
    }


    enregistrer(event) {

        this.storage.get(TOKEN_KEY).then(resp => {
            if (!resp) {
                this.presentAlertConnexion('Désolé', 'Vous devez vous connecter d\'abord');
            }
        });
        this.data = this.dataProviderService.data;
        if (this.data) {
            this.user = this.data;
            this.id_user = this.data['id_user'];
            this.id_personne = event.value;
            this.objet = new Objet(this.id_user, this.id_personne, 1);
            this.registerService.collection(this.objet).subscribe(resp => {
                if (resp['status'] === 200) {
                    this.presentToast('Carte ajoutée avec succes');
                }

            }, err => {
                this.presentToast('Erreur de connexion.');
            });
        }


    }


    async presentAlertConnexion(title, text) {
        const alert = await this.alertCtrl.create({
            header: title,
            subHeader: text,
            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    console.log('Confirm Cancel');
                }
            }, {
                text: 'Ok',
                handler: () => {
                    console.log('Confirm Ok');
                    this.router.navigate(['/connexion']);

                }
            }]
        });

        await alert.present();
    }

    async presentAlertVerifierConnexion(title, text) {
        const alert = await this.alertCtrl.create({
            header: title,
            subHeader: text,

        });

        await alert.present();
    }

    async presentToast(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000
        });
        toast.present();

    }


    async showLoading() {
        this.loading = await this.loadingCtl.create({
            message: 'Chargement...',

            spinner: 'lines-small',
            duration: 5000
        });
        return await this.loading.present();


    }
}
