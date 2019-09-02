	import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
	import {MbscCardOptions} from '@mobiscroll/angular';
	import {ActivatedRoute, Router} from '@angular/router';
	import {ModeleService} from '../services/modele.service';
	import {IonInfiniteScroll, AlertController, ToastController, LoadingController} from '@ionic/angular';
	import {SocialSharing} from '@ionic-native/social-sharing/ngx';
	import {ValiderTokenService} from '../services/valider-token.service';
	import {Storage} from '@ionic/storage';
	import {RegisterService} from '../services/register.service';
	import {Objet} from '../models/objet';
	import {BehaviorSubject} from 'rxjs';
	// import { Storage } from '@ionic/storage';
	const DATA_KEY = 'access_data';
	const TOKEN_KEY = 'access_token';

	@Component({
		selector: 'app-collection',
		templateUrl: './collection.page.html',
		styleUrls: ['./collection.page.scss'],
	})
	export class CollectionPage implements OnInit {
		//@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
		@ViewChild(IonInfiniteScroll, {static: false})infiniteScroll: IonInfiniteScroll;
		modeles: any=[];
		messageErreur: string;
		private search: any;
		user: any;
		private type: any;
		id_personne: any;
		id_user: any;
		objet: any = '';
		content:any;
		verifierRetour = new BehaviorSubject(false);
		public loading : any;

		cardSettings: MbscCardOptions = {
			theme: 'ios'
		};
		message: string = null;
		file: string = null;
		link: string = null;
		subject: string = null;
		uploaded:boolean;
		uploaded_val:any;
		toogleclassElement = true;
		toogleclassElementAFF = false;
		service:any=[];
		serviceLoading = true;
		userFilter:any={person_service : ''};
		catName="";
		typeElement="";
		current=0;
		currentEntrep=0;
		size=5;
		sizeOffset=5;
		endpage= false;
		rekAll=0;
		profil:any;
		Categorie:any=[{name : 'Particulier'},{name : 'ONG'},{name : 'Entreprise'}];
		constructor(private route: ActivatedRoute,
					private router: Router,
					private  modeleService: ModeleService,
					private  registerService: RegisterService,
					private socialSharing: SocialSharing,
					private validerToken: ValiderTokenService,
					private storage: Storage,
					private alertCtrl: AlertController,
					private toastController: ToastController,
					private loadingCtl: LoadingController, private changeDetectorRef: ChangeDetectorRef) {

		}
		loadData(event) {
			let u= this;
			setTimeout(() => {
			   this.messageErreur="plus de carte";
				event.target.complete();

				if (this.modeles.length == 1000) {
					event.target.disabled = true;
				}
			}, 500);
			
		}
		ionViewWillEnter(){
			this.ActiveCat('Tout',0);	
			this.showLoading();
			this.requestSearch();
               this.storage.get('access_data').then(resp => {
                  this.profil = resp;
                  console.log(this.profil);
                });
                this.changeDetectorRef.detectChanges()	;   
		}
			
		requestSearch(param="", element="", infiniteScroll?){
					let u=this;
					u.toogleclassElementAFF = true;

				this.route.queryParams.subscribe(res => {
					if (!res) {
							u.serviceLoading = false;
					} else {
						
						this.search = element.length != 0 ? element.toLowerCase() : res['search'].toLowerCase();
						this.type = param.length != 0 ? param.toLowerCase() : res['type'].toLowerCase();

	   
						switch (this.type) {
							case  'entreprise':
										this.infiniteScroll.disabled = true;
									//	this.showLoading();
		this.modeleService.searchE(this.search, this.current, 10000).subscribe(response => {

										if (response['status']===200) {
											if(this.modeles.data){
												if(this.modeles.data.length > 0){
													this.modeles.data = this.modeles.data.concat(response['data']);
													
												}
											}else{
												
													this.modeles = response;
											}

											this.currentEntrep += 10000; 

										   if(response['data'].length > 0){
												   u.serviceLoading = false;
												   this.verifierRetour.next(true);
										  
										   }

										}

											if(this.rekAll == 0){
												
												 this.modeleService.searchE(this.search, 0, 1000000).subscribe(response => {
													 if (response['status']===200) {
														 if(response['data']){
															 this.service = response['service'];
																this.rekAll = response['data'].length;
														 }
													 }
												 },error=>{
												});
											}
										
											console.log(this.modeles);
											if (infiniteScroll) {
													infiniteScroll.target.complete();
											}
									   this.loadingCtl.dismiss().then(a => console.log('dismissed'));
									   
									   
								},error=>{
									this.presentAlertVerifierConnexion("Désolé", "Verifier votre connexion");
									u.serviceLoading = false;
									this.loadingCtl.dismiss().then(a => console.log('dismissed'));
									});
								break;
							case  'particulier':
							this.infiniteScroll.disabled = false;
							this.service = [];
							this.toogleclassElementAFF = false;
								this.modeleService.searchP(this.search, this.current, this.size).subscribe(response => {
									if (response['status']===200) {
									console.log('afficher particulier le reour de collection status' + response['status']);
											if(this.modeles.data){
												if(this.modeles.data.length > 0){
													this.modeles.data = this.modeles.data.concat(response['data']);
													
												}
											}else{
												
													this.modeles = response;
											}
											this.current = this.sizeOffset; 
											this.sizeOffset +=  5;
											this.modeleService.messageErreur;
											this.verifierRetour.next(true);
											if (infiniteScroll) {
													infiniteScroll.target.complete();
											}
									}
											if(this.rekAll == 0){
												
												 this.modeleService.searchP(this.search, 0, 1000000).subscribe(response => {
													 if (response['status']===200) {
														 if(response['data']){
																this.rekAll = response['data'].length;
														 }
													 }
												 },error=>{
												});
											}
									},error=>{
									this.presentAlertVerifierConnexion("Désolé", "Verifier votre connexion");
									});
	   
								break;
								case  'all':
											// this.showLoading();
											this.infiniteScroll.disabled = false;
											this.service = [];
											this.toogleclassElementAFF = false;
									this.modeleService.searchAll(this.search, this.current, this.size).subscribe(response => {
										
										if (response['status']===200) {
												if(this.modeles.data){
												if(this.modeles.data.length > 0){
													this.modeles.data = this.modeles.data.concat(response['data']);
													//this.modeles = response['data'];
													
												}
											}else {
												
													this.modeles = response;
											}
											this.current = this.sizeOffset ; 
											this.sizeOffset +=  5;
											this.modeleService.messageErreur;
											this.verifierRetour.next(true);
											if (infiniteScroll) {
													infiniteScroll.target.complete();
											}	 				
										} else {
											if (infiniteScroll) {
													infiniteScroll.target.complete();
											}
											// this.loadingCtl.dismiss().then(a => console.log('dismissed'));
										}
											if(this.rekAll == 0) {
												
												 this.modeleService.searchAll(this.search, 0, 1000000).subscribe(response => {
													 if (response['status']===200) {
														 if(response['data']){
																this.rekAll = response['data'].length;
																//this.modeles = response['data'];
																console.log('verifier ce qui se passe', this.modeles);
														 }
													 }
												 },error=>{
												});
											}
	   
									},error=>{
										this.presentAlertVerifierConnexion("Désolé", "Verifier votre connexion svp !");
										});
								 break
								default:
										this.toogleclassElementAFF = false;
										this.modeles = {"status": 200,"data": [] };
										console.log('verifier le reour du modeles', this.modeles)
										this.modeleService.messageErreur;
										this.verifierRetour.next(true);                              
					   
								break;
	   
						}
						

					}
				},error=>{u.serviceLoading = false;});
				
				
		}
		

		loadMore(infiniteScroll) {
		setTimeout(()=>{
			this.requestSearch(this.type, this.search, infiniteScroll);		

		if (this.modeles.data && this.rekAll == this.modeles.data.length) {
		  this.infiniteScroll.disabled = true;
		  this.endpage = true;
		}
		},500);
	  }
	  
	  
		toggleInfiniteScroll() {
		this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
	  }
		// methode lancée au demarrage de la classe
		ngOnInit() {
			
		}
		loadFilterData(param, id){
			this.userFilter.person_service = param;
			// this.tooglebox();	
			let elClass = document.getElementsByClassName("element_");
			for (let index = 0; index < elClass.length; ++index) {
				elClass[index].setAttribute('color', 'light');
			}
			// elClass.setAttribute('color', 'primary');
			let el = document.getElementById("element_"+id);
			el.setAttribute('color', 'warning');
			
		}

		ActiveCat(param, id , activate=false){
			
			this.modeles = [];
			this.service = [];
			this.catName = param;
			this.current = 0;
			this.sizeOffset = 5;
			this.rekAll = 0;
			// this.tooglebox();	
			let elClass = document.getElementsByClassName("cat_");
			for (let index = 0; index < elClass.length; ++index) {
				elClass[index].classList.remove("sidActivate");
				// alert();
			}
			// elClass.setAttribute('color', 'primary');
			let el = document.getElementById("cat_"+id);
			el.classList.add("sidActivate");
			// console.log(param);
			if(param == "Tout"){
				param = "all";
			}
				this.typeElement = param;
			// console.log(param);
			if(activate == true){
				this.infiniteScroll.disabled = false;
				this.requestSearch(param, this.search);
			}
			
			// alert(1);
			
		}
		
		
		RequestSending(type,even){
			this.modeles = [];
			this.service = [];
			this.current = 0;
			this.sizeOffset = 5;
			this.rekAll = 0;	
			this.requestSearch(type, even);
			
		}

		share(event) {
			// this.modeleService.getUpload();
			// console.log(event.value);
			this.socialSharing.share(event.value)
				.then(() => {
					console.log(event.value);
				}).catch(() => {

			});
		}

		valider() {
			// this.modeleService.getUpload();
			this.registerService.collection(this.objet).subscribe(resp => {
				this.modeles = resp;
			   }, err => {
				console.log(err);
			});
		}


		enregistrer(event) {
			// this.modeleService.getUpload();
			this.storage.get(TOKEN_KEY).then(resp =>{
				if(!resp){
					this.presentAlertConnexion("Désolé", "Vous devez vous connecter d'abord");
				}
			});
			this.storage.get(DATA_KEY).then(data => {
				if (data) {
					this.user = data;
					this.id_user = data['id_user'];
					this.id_personne = event.value;
					this.objet = new Objet(this.id_user, this.id_personne, 1);
					this.registerService.collection(this.objet).subscribe(resp => {
					   if (resp['status']===200)
						this.presentToast( "Carte ajoutée avec succes");

					   }, err => {
						this.presentToast( "Erreur de connexion.");
					});
				}
			});


		}

		 initializeApp() {
			 //this.modeleService.getUpload();
			 this.validerToken.authenticationState.subscribe(state => {
		  if(!state){
	 // this.router.navigate(['/ma-collection']);
		  } else {
	   //       this.router.navigate(['/connexion']);
		  }
	  });
		 }
		 async presentAlert(title, text) {
			const alert = await this.alertCtrl.create({
			  header: title,
			  subHeader: text,
			  buttons: [{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
			  }, {
				text: 'Ok',
				handler: () => {

				}
			  }]
			});
			await alert.present();
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
		
		natiSHow(){
			// document.addEventListener('readystatechange', ()=>{
				// console.log('Charge');
			// let elemContent = document.getElementById("ctt-content");
			// let nativestogetc:any = document.getElementById("nativetogetc");

				
					// if(elemContent.offsetHeight > 0){
							// alert(elemContent.offsetHeight);
							// nativestogetc.style.marginTop = elemContent.offsetHeight+"px";
					// }else{
							// alert(elemContent.offsetHeight);
							// nativestogetc.style.marginTop = "0px";
					// }

			
			
			  // });
		}
		
		tooglebox(){
			let nativestogetc:any = document.getElementById("nativetogetc");
			let elemContent = document.getElementById("ctt-content");
			let elem = document.getElementById("box-ctt");
			elem.classList.toggle('hide');
			this.toogleclassElement = elem.classList.contains("hide")
			
			if(elemContent.offsetHeight > 0){
				
					nativestogetc.style.marginTop = elemContent.offsetHeight+"px";
			}else{
					nativestogetc.style.marginTop = "0px";
			}
		}
		async showLoading(){
			this.loading = await this.loadingCtl.create({
				message:"Chargement...",
				//showBackdrop: true,
				spinner: "lines-small",
				duration : 5000
			});
			return await this.loading.present();


		}
		
		
		
		
	}
