import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageAlerteService} from '../services/message-alerte.service';
import {RegisterService} from '../services/register.service';
import {ToastController, LoadingController, AlertController} from '@ionic/angular';


@Component({
    selector: 'app-commentaire',
    templateUrl: './commentaire.page.html',
    styleUrls: ['./commentaire.page.scss'],
})
export class CommentairePage implements OnInit {
    user: any;
    cartes: any;
    createSuccess: any;
    choix_communication: string = '';
    status: number = 1;

    commentaireForm = this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        telephone: ['', Validators.required],
        email: ['', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        nombre_c_v: ['', Validators.required],
        choix_communication: [this.choix_communication, Validators.required],
        status: [this.status, Validators.required],

    });

    userFilter: any = {person_service: ''};
    userCollectionFilter: any = {person_nom_phonetique: ''};

    constructor(
        private registerService: RegisterService,
        private router: Router,
        private fb: FormBuilder,
        private message: MessageAlerteService, public alertController: AlertController,
        public toastController: ToastController,
        private loadingCtl: LoadingController, private changeDetectorRef: ChangeDetectorRef) {

        this.showLoading();
        this.getModele();
    }

    ionViewWillEnter() {

        this.getModele();
        this.changeDetectorRef.detectChanges();


    }

    ngOnInit() {
        let u = this;


    }


    public valider() {
        console.log(this.commentaireForm.value);
        this.registerService.demande(this.commentaireForm.value).subscribe(data => {
                if (data) {
                    this.user = data;
                    this.createSuccess = true;
                    this.presentToast('Votre demande a été envoyée crée avec succes. ');

                } else {
                    console.log('operation impossible');
                }
            },
            error => {
                console.log('erreur ');
            });

    }

    async presentToast(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000
        });
        toast.present();
    }

    async showLoading() {
        let loading = await this.loadingCtl.create({
            message: 'Chargement...',
            duration: 1000,
            showBackdrop: false,
            spinner: 'lines-small'
        });
        loading.present();


    }

    getModele() {

        this.registerService.modele().subscribe(resp => {
            if (resp['status'] === 200) {
                this.cartes = resp;

                this.cartes['data'] = resp['data'].map(x => (x.model_statut == 1) ? x : '');
                this.cartes['data'] = this.cartes['data'].filter(function(val) {
                    return val !== '';
                });
                this.cartes = Object.assign(this.cartes, {verify_photo: true});

            } else {

            }

        }, err => {

        });


    }


    async presentAlertPrompt() {

        const alert = await this.alertController.create({
            header: 'Formulaire de Demande Personnalisée',
            message: 'Modèle Personnel',
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


                            let all: any = data;
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


}
