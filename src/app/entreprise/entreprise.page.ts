import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import {ModalController, PopoverController, NavParams, ActionSheetController, AlertController,ToastController  } from '@ionic/angular';
import {ListeServicePage} from '../liste-service/liste-service.page';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {ModeleService} from '../services/modele.service';
import {Storage} from '@ionic/storage';
import {RegisterService} from '../services/register.service';
import {Objet} from '../models/objet';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
	// import {SocialSharing} from '@ionic-native/social-sharing/ngx';
// import { WebIntent } from '@ionic-native/web-intent';
	const DATA_KEY = 'access_data';
	const TOKEN_KEY = 'access_token';
// declare var intentShim: any;

// const download = require('image-downloader');

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.page.html',
  styleUrls: ['./entreprise.page.scss'],
})
export class EntreprisePage implements OnInit {
 // @ViewChild('slider', { read: ElementRef })slider: ElementRef;
  @ViewChild('slider', { static: false}) slider : ElementRef;

  // @Input() img:any;
  // @Input() allData:any;
  // @Input() suppr:boolean;
  img: any;
  allData: any;
  suppr: boolean;
  active: boolean;
  privated: boolean;
  id: number;
  personne: number;
  requestP:number;
  collection_id:number;
	objet: any = '';
  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  };
  

// fileTransfer.upload(..).then(..).catch(..);
// fileTransfer.download(..).then(..).catch(..);
// fileTransfer.abort();

  constructor(private  registerService: RegisterService, private toastController: ToastController, private socialSharing: SocialSharing, private modalController: ModalController, public popoverController: PopoverController, private navParams: NavParams, public actionSheetController: ActionSheetController, public alertController: AlertController, public modeleService: ModeleService, private storage: Storage, private changeDetectorRef: ChangeDetectorRef, private route: ActivatedRoute,
					private router: Router, private transfer: FileTransfer, private file: File) {

   }

  ngOnInit() {
	 this.img   = this.navParams.get('img');
     this.allData   = this.navParams.get('allData');
     this.suppr   = this.navParams.get('suppr');
     this.active   = this.navParams.get('active');
     this.privated   = this.navParams.get('privated');
     this.id   = this.navParams.get('id');
     this.personne   = this.navParams.get('personne');
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
  
  openWeb(){

		let scheme ="";
       // if(device.platform === 'iOS') {
            // scheme = 'toget://';
        // }
        // else if(device.platform === 'Android') {
            // scheme = 'io.ionic.toget_me';
        // }
	window.open('https://www.toget-me.pro/collection?search=.&type=all', '_system', 'location=no');
  
}
 
  close() {
    this.modalController.dismiss();
  }
  
  
  requestCollection(){
	  
		this.storage.get(TOKEN_KEY).then(resp =>{
				if(!resp){
					 this.requestP = 0;
					// this.presentAlertConnexion("Désolé", "Vous devez vous connecter d'abord");
				}
		});
		this.storage.get(DATA_KEY).then(data => {
			this.id = data['id_user'] ?  data['id_user'] : this.id;
			if (data) {
					  this.modeleService.searchCarteSingle(this.id , this.personne).subscribe(response => {
						  if(response && response['status'] == 200){
							  if(response['data'].status == true){
									this.requestP = 1;
									console.log(response['data'].id);
									this.collection_id = response['data'].id;
							  }
							  
							  if(response['data'].status == false){
								  this.requestP = 0;
							  }
						  }else{
							  this.requestP = 0;
						  }
					  }, 
					  error => {
						  this.requestP = 0;
					  });
			}
	  });
	  
  }
  
  partager(){
	  			// this.socialSharing.share(event.value)
				// .then(() => {
					// console.log(event.value);
				// }).catch(() => {

			// });
  }
  
  		enregistrer() {
			// this.modeleService.getUpload();
			
			this.storage.get(TOKEN_KEY).then(resp =>{
				if(!resp){
					this.presentAlertConnexion("Désolé", "Vous devez vous connecter pour avoir accès à cette fonctionnalité !");
				}
			});
			this.storage.get(DATA_KEY).then(data => {
				if (data) {
					this.id = data['id_user'] ?  data['id_user'] : this.id;
					this.objet = new Objet(this.id , this.personne,1);
					this.registerService.collection(this.objet).subscribe(resp => {
						
					   if (resp['status']===200){
						this.requestP = 1;
						this.presentToast( "Carte ajoutée avec succes");
						this.collection_id = resp['response'];
					   }

					   }, err => {
						this.presentToast( "Erreur de connexion.");
					});
				}
			});


		}


  		delete() {
			// this.modeleService.getUpload();
			// console.log(this.allData);
			// this.collection_id = this.allData.id;
			this.storage.get(TOKEN_KEY).then(resp =>{
				if(!resp){
					this.presentAlertConnexion("Désolé", "Vous devez vous connecter pour avoir accès à cette fonctionnalité !");
					
				}
			});
			this.storage.get(DATA_KEY).then(data => {
				if (data) {

					this.modeleService.delete(this.collection_id).subscribe(resp => {
						
					   if (resp['status']===200 && resp['response']=== true){
						this.requestP = 0;
						this.presentToast( "Carte supprimé avec succes");
						if(this.suppr == true){							
							this.close();
							this.router.navigate(['/connexion']);
						}
						
					   }

					   }, err => {
						this.presentToast( "Erreur de connexion.");
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
			  subHeader: "Voulez-vous ajouter cette carte de votre collection personnel ?",
			  buttons: [{
				text: 'Non, je décline ',
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => {
				  console.log('Confirm Cancel');
				}
			  }, {
				text: 'Oui, je le veux',
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
			  subHeader: "Element déja ajouter a votre collection !",
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
			  subHeader: "Voulez-vous supprimer cette carte à votre collection personnel ?",
			  buttons: [{
				text: 'Non, je décline ',
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => {
				  console.log('Confirm Cancel');
				}
			  }, {
				text: 'Oui, je le veux',
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
		
    async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ListeServicePage,
      event: ev,
       mode: 'ios',
	   componentProps: {		
		allData : this.allData
      }	 
    });
    return await popover.present();
  }
  
    openPreview() {
    this.modalController.create({
      component: ListeServicePage
    }).then(modal => {
      modal.present();
    });
  }
  
     async presentActionSheet() {
		 let u = this;
		 let Personnel = (this.allData.person_tel_perso) ? this.allData.person_tel_perso : 'Aucun';
		 let Professionnel = (this.allData.person_tel_profe) ? this.allData.person_tel_profe : 'Aucun';
		 let email = (this.allData.person_email)  ? this.allData.person_email : 'Aucun';
		 let siteW = "";
		if(this.allData.id_entrep == -1){
			siteW = (this.allData.person_site_web) ? this.allData.person_site_web : 'Aucun';
			 
		 }else{
		  siteW = (this.allData.entreprise_site_web) ? this.allData.entreprise_site_web : 'Aucun';
			 
		 }
    const actionSheet = await this.actionSheetController.create({
      header: 'Plus d\'options',
      buttons: [{
        text: siteW,
        icon: 'git-network',
        handler: () => {
 			if(siteW !== 'Aucun'){				
				  
				  window.location.href=siteW;
				  
			}else{
				alert("Action non autoriser !");
			}           
        }
      },{
        text: 'Signaler un problème',
        icon: 'bug',
        handler: () => {
						u.openPreview();
        }
      },{
        text: 'Fermer',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }

    share(event) {
		let linkShare = "hhhhhhhhhh";
        this.socialSharing.share(event, event, event, event)
            .then(() => {
                console.log(event);
            }).catch(() => {
				

        });
		
    }
	
	
	
	async presentAlertPrompt() {
		let aaa= this.img;
    const alert = await this.alertController.create({
      header: 'Formulaire de Demande',
	  message: 'Modèle  <img src="'+aaa+'">',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          placeholder: 'Nom complet exemple : jhon doe'
        },
        {
          name: 'telephone',
          type: 'text',
          placeholder: 'Téléphone exemple : 02020202'
        },
        {
          name: 'nbr',
          type: 'tel',
          placeholder: 'quantité exemple : 20 '
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
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
  
  
     async presentActionSheetCall() {
		 
		 
 let u = this;
		 let Personnel = (this.allData.person_tel_perso) ? this.allData.person_tel_perso : 'Aucun';
		 let Professionnel = (this.allData.person_tel_profe) ? this.allData.person_tel_profe : 'Aucun';
		 let email = (this.allData.person_email)  ? this.allData.person_email : 'Aucun';
		 let siteW = "";
		if(this.allData.id_entrep == -1){
			siteW = (this.allData.person_site_web) ? this.allData.person_site_web : 'Aucun';
			 
		 }else{
		  siteW = (this.allData.entreprise_site_web) ? this.allData.entreprise_site_web : 'Aucun';
			 
		 }
		 
		 
    const actionSheet = await this.actionSheetController.create({
      header: 'Option d\'appel',
      buttons: [{
        text: Personnel,
        icon: 'call',
		cssClass: 'button-cam',
        handler: () => {
			if(Personnel !== 'Aucun'){				
				  
				  window.location.href='tel:'+Personnel;
			}else{
				alert("Action non autoriser !");
			}
        }
      },{
        text: Professionnel,
        icon: 'call',
        handler: () => {
			if(Professionnel !== 'Aucun'){				
				  
				  window.location.href='tel:'+Professionnel;
			}else{
				alert("Action non autoriser !");
			}          
        }
      },{
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
		 
		 
 let u = this;
		 let Personnel = (this.allData.person_tel_perso) ? this.allData.person_tel_perso : 'Aucun';
		 let Professionnel = (this.allData.person_tel_profe) ? this.allData.person_tel_profe : 'Aucun';
		 let email = (this.allData.person_email)  ? this.allData.person_email : 'Aucun';
		 let siteW = "";
		if(this.allData.id_entrep == -1){
			siteW = (this.allData.person_site_web) ? this.allData.person_site_web : 'Aucun';
			 
		 }else{
		  siteW = (this.allData.entreprise_site_web) ? this.allData.entreprise_site_web : 'Aucun';
			 
		 }
		 
		 
    const actionSheet = await this.actionSheetController.create({
      header: 'Option de mail',
      buttons: [{
        text: email,
        icon: 'mail',
        handler: () => {
 			if(email !== 'Aucun'){				
				  
				  window.location.href='mailto:'+email;
			}else{
				alert("Action non autoriser !");
			}          
        }
      },{
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
 	         this.share(link);
        }
      },{
        text: 'Partager le lien vers la carte de visite',
        icon: 'link',
        handler: () => {
 	   
        }
      },{
        text: 'Fermer',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }
  
  
  
  
  
  
  
  
  downloadCarte(links=""){
	  console.log(links);
	  // let fileTransfer: FileTransferObject = this.transfer.create();
	// let filename = this.allData.person_nom_phonetique ? 'Toget-me_'+this.allData.person_nom_phonetique : "Toget-me_"+new Date().getTime();
		// const options = {
		  // url: links,
		  // dest: '/Toget-me/MediaPhotosCarte_v/'+filename+'.png',
			// name : filename

		// }

		  // console.log(this.file);
	  // fileTransfer.download(options.url, this.file.dataDirectory + options.dest ).then((entry) => {
		// console.log('download complete: ' + entry.toURL());
	  // }, (error) => {
	  // });

		this.socialSharing.saveToPhotoAlbum(['https://www.google.nl/images/srpr/logo4w.png','www/image.gif']);
  }
  

	
}
