import {Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef} from '@angular/core';
import {NavParams, ModalController, IonInfiniteScroll, ToastController, LoadingController} from '@ionic/angular';
import { Slider } from '@mobiscroll/angular/src/js/classes/slider';
import { Router } from '@angular/router';
import { ModeleService } from '../services/modele.service';
import {Storage} from '@ionic/storage';
import { ValiderTokenService } from '../services/valider-token.service';
import {BehaviorSubject} from 'rxjs';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {DataProviderService} from '../services/data-provider.service';
const  DATA_KEY = 'access_data';
const TOKEN_KEY = 'access_token';
@Component({
  selector: 'app-ma-collection',
  templateUrl: './ma-collection.page.html',
  styleUrls: ['./ma-collection.page.scss'],
})
export class MaCollectionPage implements OnInit {
  public modeles: any;
  public keyword: string;
    authenticationState = new BehaviorSubject(false);
    user: any;
    id_user: number;
    token:any;
    data = [];
    modelesLocalStorage:[];
    verifierRetour = new BehaviorSubject(false);

   @Input() filskeyword;
  // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll :IonInfiniteScroll;
	userFilter:any={person_service : ''};
	userCollectionFilter:any={person_nom_phonetique : ''};
  constructor(
    private router: Router,
    private modelService: ModeleService,
    private socialSharing: SocialSharing ,
    private storage: Storage,
    private validerToken: ValiderTokenService,
    private toastController: ToastController,
    private loadingCtl: LoadingController,
     private changeDetectorRef: ChangeDetectorRef,
     private   dataProviderService: DataProviderService
  )
  {
//this.initializeApp();
// this.showLoading();
//this.dataProviderService.loadDataMaCollection();
  }
  
  
  keyUpsearch(param){
	  this.userCollectionFilter.person_nom_phonetique = param;
	  // this.userCollectionFilter.date_ajout = param;
	  // this.userCollectionFilter.person_code = param;
	  // this.userCollectionFilter.person_tel_perso = param;
	  // this.userCollectionFilter.person_tel_profe = param;
	  // this.userCollectionFilter.person_email = param;
	  // this.userCollectionFilter.person_site_web = param;
	  // console.log(param);
  }
 recupererToken(){
   return   this.storage.get(TOKEN_KEY).then(token => {
         console.log('token recuperer dans le service valider token:', token);

         if (token) {
             this.token = token;
         }
     });

 }

  ngOnInit() {

      }

      
    loadData(event) {
      setTimeout(() => {
          console.log('plus de carte');
          event.target.complete();

          if (this.modeles.length == 1000) {
              event.target.disabled = true;
          }
      }, 500);
  }
  share(event) {
		// this.modelService.getUpload();
        console.log(event.value);
        this.socialSharing.share(event.value)
            .then(() => {
                console.log(event.value); 
            }).catch(() => { 

        });
    }
    carteCollection() {
        this.modeles = [];
        this.modelesLocalStorage = [];
        this.data = this.dataProviderService.data;
        if(this.data) {
                this.user = this.data;
                console.log('this.user', this.user);
                this.id_user = this.user['id_user'];
                console.log('this.id_user:',  this.id_user);
                this.modelService.searchCarte(this.id_user).subscribe(resp => {
                    if (resp['status'] === 200) {
                        this.modeles = resp;
                       this.modelesLocalStorage = this.modeles;
                       this.dataProviderService.updateDataMaCollection(this.modelesLocalStorage);
                        this.verifierRetour.next(true);
                    } else {
                        this.presentToast('Une erreur est survenue. Veuillez réessayer ');
                    }

                }, err => {
                    this.presentToast('Erreur de connexion. vous tes en local. Merci ');
                     this.modeles = [];
                    this.modeles = this.dataProviderService.dataMaCollection;
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
    async presentToast(text: string) {
		
        const toast = await this.toastController.create({
            message: text,
            duration: 2000
        });
        toast.present();

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
	
	
	supprimer(event) {
		// this.modeleService.getUpload();
        this.storage.get(TOKEN_KEY).then(resp =>{
            if(!resp){
                this.presentToast( "Une erreur est survenue !");
            }
        });
        this.storage.get(DATA_KEY).then(data => {
            if (data) {
                this.modelService.delete(event.value).subscribe(resp => {
                   if (resp['status']===200)
                    this.presentToast( "Carte supprimé avec succes");
					this.carteCollection();
                   }, err => {
                    this.presentToast( "Erreur de connexion.");
                });
            }
        });


    }
	
	
  }
