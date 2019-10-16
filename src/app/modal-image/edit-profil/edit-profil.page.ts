import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DataProviderService} from '../../services/data-provider.service';
import {RegisterService} from '../../services/register.service';
import {Storage} from '@ionic/storage';


@Component({
    selector: 'app-edit-profil',
    templateUrl: './edit-profil.page.html',
    styleUrls: ['./edit-profil.page.scss'],
})
export class EditProfilPage implements OnInit {
    profil: any = [];
    @Input('edit') edit: string;
    onForm: FormGroup;
    data = [];
    password : any;
    lastPassword: any;
    validerPhotoValue: boolean;

    constructor(private modalCtrl: ModalController, navParams: NavParams,
                private auth: RegisterService,
                private storage: Storage,
                public dataProviderService: DataProviderService,
                public toastController: ToastController,
                private formBuilder: FormBuilder) {

        this.dataProviderService.loadData();
        this.dataProviderService.loadDataPhotos();

    }


    ngOnInit(): void {

        this.onForm = this.formBuilder.group({
            id_user: new FormControl(this.dataProviderService.data.id_user),
            nom: new FormControl(this.dataProviderService.data.nom),
            telephone: new FormControl(this.dataProviderService.data.telephone),
            email: new FormControl(this.dataProviderService.data.email),
            password: new FormControl(this.password),
            lastPassword: new FormControl(this.lastPassword),
            date_inscription: new FormControl(this.dataProviderService.data.date_inscription),
            statut: new FormControl(this.dataProviderService.data.status),
            level: new FormControl(this.dataProviderService.data.level),
            prenoms: new FormControl(this.dataProviderService.data.prenoms),
            photos: new FormControl(this.dataProviderService.data.photos)

        });

    }


    closeModal() {
        this.modalCtrl.dismiss().then(() => {

        });
    }
    ionViewWillLeave() {
        this.dataProviderService.loadData();
        this.dataProviderService.valeurPhoto.subscribe(resp => {
            this.validerPhotoValue = resp;
            console.log('valeur app component de dataphoto dan localS', this.validerPhotoValue);
        });


    }
    ionViewWillEnter(){
        this.dataProviderService.valeurPhoto.subscribe(resp => {
            this.validerPhotoValue = resp;
            console.log('valeur enter de edit  de dataphoto dan localS', this.validerPhotoValue);
        });
    }

    updateProfil(f) {
        f.value = this.dataProviderService.data;
    }

    saveData() {
                this.dataProviderService.data[this.profil.index] = this.onForm.value;
                this.dataProviderService.updateData(this.onForm.value);
                this.profil.value =  this.dataProviderService.data[this.profil.index];
                this.dataProviderService.isValue();
        if (this.edit === 'profil') {
            this.onForm = this.formBuilder.group({
                id_user: new FormControl(this.dataProviderService.data.id_user),
                nom: new FormControl(this.onForm.value.nom),
                prenoms: new FormControl(this.onForm.value.prenoms),

            });
            console.log('verifier la veleur de mis a jour avec onform', this.onForm.value);
             this.auth.updateProfil(this.onForm.value).subscribe(resp => {
                 if (resp['status']=== 200) {
                     console.log('valeur mis ajour dans la base', resp);

                 }

             });

        }
        if (this.edit === 'pass') {
            this.onForm = this.formBuilder.group({
                id_user: new FormControl(this.dataProviderService.data.id_user),
                password: new FormControl(this.onForm.value.password),
                lastPassword: new FormControl(this.onForm.value.lastPassword),

            });
            console.log('verifier la veleur de mis a jour avec onform', this.onForm.value);
            this.auth.updateProfil(this.onForm.value).subscribe(resp => {
                if (resp['status']=== 200) {
                    console.log('valeur mis ajour dans la base', resp);
                }

            });
        }

                this.updateMessage();


                this.closeModal();

    }

async updateMessage() {
    const toast = await this.toastController.create({
        message: 'enregistrement effectué',
        duration: 2000
    });
    toast.present();
}

}
