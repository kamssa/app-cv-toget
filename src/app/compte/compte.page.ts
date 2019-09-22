import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, NavController, NavParams, ToastController} from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {Storage} from '@ionic/storage';
import {RegisterService} from '../services/register.service';
import {AppConfig} from '../parametre/config';
import {DataProviderService} from '../services/data-provider.service';
import {EditProfilPage} from '../modal-image/edit-profil/edit-profil.page';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';



@Component({
    selector: 'app-compte',
    templateUrl: './compte.page.html',
    styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {

    //profil: any = [];
    link_img: any = AppConfig.image_url;
    validerPhotoValue: boolean;
    data: any;
    valueSerDataSource = new BehaviorSubject<any>('');
    constructor(private modalCtrl: ModalController,
                private camera: Camera,
                private alerteCtrl: AlertController,
                private storage: Storage,
                private auth: RegisterService,
                public navCtrl: NavController,
                private changeDetectorRef: ChangeDetectorRef,
                private navParams: NavParams,
                public dataProviderService: DataProviderService,
                public toastController: ToastController,
                private modalController: ModalController,
                public alertController: AlertController,
                private loadingCtl: LoadingController
    ) {
        this.dataProviderService.loadData();

    }

    ngOnInit() {
        this.valueSerDataSource.pipe(
            debounceTime(200),
            distinctUntilChanged())
            .subscribe(value => {
           this.dataProviderService.loadData();
            });
    }

    ionViewWillLeave() {
        this.dataProviderService.loadData();
        this.dataProviderService.valeurPhoto.subscribe(resp => {
            this.validerPhotoValue = resp;
            console.log('valeur will leave  de edit  de dataphoto dan localS', this.validerPhotoValue);
        });
    }
    ionViewWillEnter() {
        this.dataProviderService.valeurPhoto.subscribe(resp => {
            this.validerPhotoValue = resp;
            console.log('valeur enter de edit  de dataphoto dan localS', this.validerPhotoValue);
        });
    }

    async close() {
        await this.modalCtrl.dismiss();
    }

    async editProfi(to_edit: string) {
        const modal = await this.modalCtrl.create({
            component: EditProfilPage,
            componentProps: {
                'profil': this.dataProviderService.data,
                'edit': to_edit,

            }
        });
        return await modal.present();
    }
    public async onTackPicture() {
        const options1: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA,
            allowEdit: true
        };
        const options2: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true
        };
        let alert = await this.alerteCtrl.create({
            header: 'Confirmation',
            message: 'Source?',
            buttons: [
                {
                    text: 'Camera',
                    handler: () => {
                        this.getPicture(options1);
                    }
                },
                {
                    text: 'Librairie',
                    handler: () => {
                        this.getPicture(options2);
                    }
                }
            ]
        });

        await alert.present();
    }


    private getPicture(params: CameraOptions) {

        this.camera.getPicture(params).then(data => {
         //   this.dataProviderService.data.photos = 'data:image/png;base64,' + data;
            this.auth.updateProfil({
                id_user: this.dataProviderService.data['id_user'],
                user_photo: 'data:image/png;base64,' + data
            }).subscribe(resp => {
                if (resp['status'] === 200) {
              this.auth.getUserId(this.dataProviderService.data['id_user']).subscribe(result => {
                  if (result['status'] === 200) {
                      this.dataProviderService.data.photos = result['data'].photos;
                      this.dataProviderService.updateData(result['data']);
                      this.dataProviderService.updateDataPhotos(true);
                      this.showLoading();


                  } else {
                      console.log('erreur de traitement');
                  }
              });
                } else {
                    console.log('erreur de traitement');
                }
            });



        });
    }

    async deleteItem(index) {
        const alert = await this.alerteCtrl.create({
            header: 'Supprimer!',
            message: 'Voullez vous vraiment supprimer?',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                    }
                }, {
                    text: 'Supprimer',
                    handler: () => {
                        this.dataProviderService.data.splice(index, 1);
                       // this.dataProviderService.updateData(this.profil);
                        this.deleteMessage();
                    }
                }
            ]
        });

        await alert.present();
    }

    async deleteMessage() {
        const toast = await this.toastController.create({
            message: 'Item correctement supprimé',
            duration: 2000
        });
        toast.present();
    }

    async showLoading(){
        let loading = await this.loadingCtl.create({
            message:"Patientez...",
            duration: 2000,
            showBackdrop: false,
            spinner: "lines-small"
        });
        loading.present();


    }
}
