import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {Platform} from '@ionic/angular';
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
  loadingBar = true;
	
  constructor(private photoViewer: PhotoViewer,private platform: Platform, private modalController: ModalController, private outil : OutilService,
    public registerService : RegisterService) { this.showLoading();  this.ionViewWillEnter();}

  ngOnInit() {

  }
  
  ionViewWillEnter(){

		  console.log('azerty');

		
			let u = this;
			window.addEventListener("DOMContentLoaded", (event) => {
			u.loadingBar = false;
			 console.log('element : ', u.loadingBar); // 2nd
      });	  
     
  }
  
  
  
      async showLoading() {


    }
	
	

    openPreview(img, allData:any={}, suppr=false, active=false,privates=false, id, personne, position) {

		this.outil.openPreview(img, allData, suppr, active, privates, id, personne);

  }
  
  
  checker(param): boolean {
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

}
