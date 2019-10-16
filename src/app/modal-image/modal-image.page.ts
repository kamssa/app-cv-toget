import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import { ParametresPage } from '../components/parametres/parametres.page';
import { ComptePage } from '../compte/compte.page';
import { ConfidentialComponent } from './confidential/confidential.component';
import { MesCartesComponent } from './mes-cartes/mes-cartes.component';
import { MaCollectionPage } from '../ma-collection/ma-collection.page';
import { SearchHistoryComponent } from './search-history/search-history.component';
import {ValiderTokenService} from '../services/valider-token.service';
import {Router} from '@angular/router';
import {RegisterService} from '../services/register.service';
import {Storage} from '@ionic/storage';
import { AppConfig } from '../parametre/config';
import {DataProviderService} from '../services/data-provider.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.page.html',
  styleUrls: ['./modal-image.page.scss'],
})
export class ModalImagePage implements OnInit {

  color: string = '#09c';

  profil: any;
  link_img:any = AppConfig.image_url;
  valueSerDataSource = new BehaviorSubject<any>('');
  validerPhotoValue: boolean;
  did: any;
  constructor(private modalCtrl: ModalController,
              private validerToken: ValiderTokenService,
              private router: Router,
              private registerService: RegisterService,
              private  toastController: ToastController,
              private storage: Storage,
              private changeDetectorRef: ChangeDetectorRef,
              public dataProviderService: DataProviderService) {
  }

  ngOnInit() {
    this.valueSerDataSource.pipe(
        debounceTime(200),
        distinctUntilChanged())
        .subscribe(value => {
         this.dataProviderService.loadData();
        });

}

ionViewWillEnter() {

  this.dataProviderService.valeurPhoto.subscribe(resp => {
    this.validerPhotoValue = resp;

  });
  this.changeDetectorRef.detectChanges();
  
  
}


ionViewDidEnter(){
    console.log("ionViewDidEnter");

    this.dataProviderService.loadData();
	
}


checker(){
	this.did = setInterval(()=>{
		console.log(1);
		let localV = sessionStorage.getItem('REDIRECT');
		if(localV == '1'){
			this.closeModal();
			sessionStorage.setItem('REDIRECT', '0');
		}

		if(localV == '2'){
			sessionStorage.setItem('REDIRECT', '0');
			clearInterval(this.did);
		}
	}, 1000);
}
async closeModal() {
 await this.modalCtrl.dismiss();
}
ionViewWillLeave(){
	// this.did.clear();
	// if(this.did){
		clearInterval(this.did);
		sessionStorage.setItem('REDIRECT', '0');
		console.log(2);
	// }

  this.dataProviderService.loadData();
  this.dataProviderService.valeurPhoto.subscribe(resp => {
    this.validerPhotoValue = resp;

  });
}
  async showCartes() {
    const modal = await this.modalCtrl.create({
      component: MesCartesComponent,
    });
    return await modal.present();
  }

  
  async showCompte() {
    const modal = await this.modalCtrl.create({
        component: ComptePage,
        componentProps: {
            'profil': this.dataProviderService.data,
            animated: true

        }
    });

     return  await modal.present();

}


  async showHistory() {
    const modal = await this.modalCtrl.create({
      component: SearchHistoryComponent,
    });
    return await modal.present().then(()=>{
		this.checker();
	});;
  }

  async showParams() {
    const modal = await this.modalCtrl.create({
      component: ParametresPage,
    });
    return await modal.present();
  }

  async showLogout() {
    this.registerService.logout();
    console.log('deconnexion');
    this.presentToast('Déconnexion réussie');
  }
  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present().then(() => {
      this.modalCtrl.dismiss();
      this.router.navigateByUrl('/tabs/accueil');
    });


  }
}

