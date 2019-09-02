import {Component, EventEmitter, Input, OnInit, Output, SecurityContext } from '@angular/core';
import { NavParams, ModalController, PopoverController  } from '@ionic/angular';
import {
DomSanitizer 
} from '@angular/platform-browser';
import { SMS } from '@ionic-native/sms/ngx';
@Component({
  selector: 'app-single-carte',
  templateUrl: './single-carte.page.html',
  styleUrls: ['./single-carte.page.scss'],
})
export class SingleCartePage implements OnInit {

  @Input('_id') _id: number;
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
  @Output() share = new  EventEmitter<any>();
  @Output() ajouter = new  EventEmitter<any>();
  link:any;
  allData:any=[];
  constructor(private navParams: NavParams, private modalController: ModalController, public popoverController: PopoverController, private sanitizer: DomSanitizer, private sms: SMS) { 
		this.allData = navParams.get('allData');
  }

  ngOnInit() {
	   
  }

public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}


	sendSMS(tel, messages){
		this.sms.send(tel, messages);
	}
  onPartager(){
    this.link = 'http://192.168.8.200:8100/share/'+this._id+'/'+this.code;
    this.share.emit({value:this.link});

  }
  onAjouter(){
    this.ajouter.emit({value:this._id});
   }
}
