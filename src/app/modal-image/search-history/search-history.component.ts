import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController  } from '@ionic/angular';
import {Router} from '@angular/router';


import {Storage} from '@ionic/storage';
import * as $ from 'jquery';
const HISTORIQUE_KEY = 'access_Historique';
export class Activite{
  id?: number;
  date?: string;

}
@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss'],
})
export class SearchHistoryComponent implements OnInit {
  activities: any[];

  constructor(private modalCtrl: ModalController, private storage: Storage, private router: Router, public navCtrl: NavController, private loadingCtl: LoadingController,) { }

  ngOnInit() {
		this.getHistorie();

  }
  
	async showLoading(){
		let loading = await this.loadingCtl.create({
			message:"Chargement...",
			//showBackdrop: true,
			spinner: "lines-small",
			duration : 5000
		});
		return await loading.present();
	}
	
  closeModal(){
		this.modalCtrl.dismiss().then(()=>{
			sessionStorage.setItem('REDIRECT', '2');
		});;
  }
  
  
  getHistorie(){
			this.storage.get(HISTORIQUE_KEY).then((val: Activite[]) => {
			if(val){
				this.activities = val.reverse();
			}else{
				this.activities = [];
			}
        }, error=>{
				this.activities = [];

			
		});  
  }
  
  delete(i){
		let allow = this.activities.map(x => (x.id != i)? x : '');
	    this.activities = allow.filter( function(val){return val !== ''} );
		this.storage.set(HISTORIQUE_KEY, this.activities);
  }
  
  delete_all(data){
		let allow = this.activities.map(x => (x.date != data)? x : '');
	    this.activities = allow.filter( function(val){return val !== ''} );
		this.storage.set(HISTORIQUE_KEY, this.activities);
  }
  redirect(param){

		this.router.navigateByUrl(param);
		sessionStorage.setItem('REDIRECT', '1');
		this.modalCtrl.dismiss().then(()=>{
			sessionStorage.setItem('REDIRECT', '1');
		});
		this.showLoading();
  }



	showme(me, other, col){
		
  	$('#' + me).toggle(500);
  	$('#' + col).toggleClass('collapsed');
		
	}
}
