import { DataProviderService } from './../../services/data-provider.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ModalController,  ToastController, LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';
import { ModeleService } from 'src/app/services/modele.service';
import {Storage} from '@ionic/storage';
import { ValiderTokenService } from 'src/app/services/valider-token.service';


@Component({
  selector: 'app-mes-cartes',
  templateUrl: './mes-cartes.component.html',
  styleUrls: ['./mes-cartes.component.scss'],
})
export class MesCartesComponent implements OnInit {
  public cartes: any;
  public modeles: any;
  public user: any;
  public id_user: any;
  data =[];
userCollectionFilter:any={person_nom_phonetique : ''};
  constructor(	private router: Router, 
				private modalCtrl: ModalController,
				private modelService: ModeleService,
				private storage: Storage,
				private toastController: ToastController,
				private loadingCtl: LoadingController,
				private validerToken: ValiderTokenService,				
                private changeDetectorRef: ChangeDetectorRef,
                private  dataProviderService: DataProviderService) { }

  ngOnInit() {
    
  }
  
    keyUpsearch(param){
	  this.userCollectionFilter.person_nom_phonetique = param;

  }
  closeModal(){
    this.modalCtrl.dismiss();
  }
  
  
      async presentToast(text: string) {
		
        const toast = await this.toastController.create({
            message: text,
            duration: 2000
        });
        toast.present();

    }
  
      carteCollection() {
		this.modeles=[];
        this.data = this.dataProviderService.data;
            if (this.data) {
                this.user = this.data;
                this.id_user = this.user['id_user'];
                this.modelService.searchCarteSinglePersonnel(this.id_user).subscribe(resp => {
                       if(resp['status'] === 200){
                           this.cartes = resp;
                       } else {
                          this.presentToast('Une erreur est survenue. Veuillez réessayer ');
                       }

                    },err => {
                         this.presentToast('erreur, Veuillez verifier votre connexion internet! ');
                    });

            }
       

    }
	
	
	    ionViewWillEnter() {
		this.showLoading();
        this.validerToken.authenticationState.subscribe(state => {
            if(state){
					this.carteCollection();
            } else {
                console.log('token expired');
            }
        });
		
		 this.changeDetectorRef.detectChanges()	;  
    }
	
	
	    async showLoading(){
        let loading = await this.loadingCtl.create({
            message:"Chargement...",
            duration: 2000,
            showBackdrop: false,
            spinner: "lines-small"
        });
        loading.present();


    }

}
