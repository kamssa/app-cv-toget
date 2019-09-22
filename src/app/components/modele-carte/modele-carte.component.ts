import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {Platform} from '@ionic/angular';
import {EntreprisePage} from '../../entreprise/entreprise.page';
import {OutilService} from '../../parametre/outil.service';
import {RegisterService} from '../../services/register.service';
@Component({
  selector: 'app-modele-carte',
  templateUrl: './modele-carte.component.html',
  styleUrls: ['./modele-carte.component.scss'],
})
export class ModeleCarteComponent implements OnInit {

  @Input('_id') _id: number;
  @Input('_id_col') _id_col: number;
  @Input('code') code : string;
  @Input('logo') logo: string;
  @Input('activite_societe') activite_societe: string;
  @Input('nom_entreprise') nom_entreprise: string;
  @Input('slogan') slogan: string;
  @Input('nom') nom: string;
  @Input('prenom') prenom: string;
  @Input('fonction') fonction: string;
  @Input('boite_postal') boite_postal: string;
  @Input('adresse') adresse: string;
  @Input('site_web') site_web: string;
  @Input('email') email: string;
  @Input('telphone') telphone: string;
  @Input('portable') portable: string;
  @Input('couleur_primary') couleur_primary: string;
  @Input('couleur_secondary') couleur_secondary: string;
  @Input('couleur_terty') couleur_terty: string;
  @Input('texte_primary') texte_primary: string;
  @Input('texte_secondary') texte_secondary: string;
  @Input('texte_terty') texte_terty: string;
  @Input('couleur_fond') couleur_fond: string;
  @Input('image_fond') image_fond: string;
  @Input('model_carte') model_carte: string;
  @Input('model_content') model_content: any;
  @Input('allData') allData: any;
  @Input('Verify') Verify: boolean;
  @Input('actionS') actionS: boolean;
  @Input('privatedMe') privatedMe: boolean;
  @Input('marge') marge: boolean;
  @Input('user') user: boolean;
  @Input('activeToolBar') activeToolBar = false;
  @Input('userFilter') userFilter:any={person_service : ''};
  @Input('userCollectionFilter') userCollectionFilter:any={};
  @Output() share = new  EventEmitter<any>();
  @Output() ajouter = new  EventEmitter<any>();
  @Output() supprimer = new  EventEmitter<any>();
  link:any;
  tailleAll=0;
	public otp: any=[];
	public keysearch = 0;
	loadingBar = true;
	
  constructor(private photoViewer: PhotoViewer,private platform: Platform, private modalController: ModalController, private outil : OutilService,
    private loadingCtl: LoadingController, public registerService : RegisterService) { this.showLoading();  this.ionViewWillEnter();}

  ngOnInit() {
				  // console.log('azerty');
			// let u = this;

	  // if(Image.addEventListener) {
		  // Image.addEventListener("load",function() {
		  
		  	// u.loading = false;
			 // console.log('element : ', u.loading); // 2nd
		  
	  // }); }
// else { Image.attachEvent("onload", function() {
	
		// u.loading = false;
			 // console.log('element : ', u.loading); // 2nd
// }); }
  }
  
  ionViewWillEnter(){
			// let u=this;
		    // window.onload = (e) => {
            // u.loadingBar = false;
		  console.log('azerty');
			// };
		
			let u = this;
			window.addEventListener("DOMContentLoaded", (event) => {
			u.loadingBar = false;
			 console.log('element : ', u.loadingBar); // 2nd
      });	  
     
  }
  
  
  
      async showLoading(){
		  // let u= this;
        // let loading = await this.loadingCtl.create({
            // message:"Chargement...",
            // duration: 2000,
            // showBackdrop: false,
            // spinner: "lines-small"
        // });
        // loading.present().then(() => {
            // if (u.loading == false){
             // loading.dismiss();
            // }
        // });


    }
	
	
	converter(param:any){
	  let u= this;
	  let jsonStr = param.replace(/(\w+:)|(\w+ :)/g, function(s) {
		return '"' + s.substring(0, s.length-1) + '":';
				});
				if(jsonStr){
					
					  this.otp = JSON.parse(jsonStr);	
				}
	  return this.otp;  
	}
  onPartager(){
    this.link = 'http://192.168.8.200:8100/share/'+this._id+'/'+this.code;
    this.share.emit({value:this.link});

  }
  
  
  taille():any{
	  return this.allData.data.length;
  }
  onAjouter(param){
    this.ajouter.emit({value:param});
   }

   ondelete(id){
    this.supprimer.emit({value:id});
   }
   
   
    openPreview(img, allData:any={}, suppr=false, active=false,privates=false, id, personne, position) {
		// console.log(id);
		// console.log(personne);
		this.outil.openPreview(img, allData, suppr, active, privates, id, personne);
		// let f = this.allData.data.splice(position, 0);
		// console.log(f);
		// console.log(this.registerService.comunication);
		// this.registerService.comunication = 0;
  }
  
  
  checker(param):boolean{
	  // if(this.registerService.comunication && this.registerService.comunication.length > 0){}
	  if(this.registerService.comunication.indexOf(param) != -1)
		{  
		   return true
		}else{
			return false;
		}
		
		if(this.registerService.comunication.length === this.allData.data.length){
			this.allData.data = [];
		}
  }
  
  
  in_array(needle, haystack){
    let found = 0;
    for (let i=0, len=haystack.length;i<len;i++) {
        if (haystack[i] == needle) return i;
            found++;
    }
    return -1;
	}

}
