import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController   } from '@ionic/angular';
@Component({
  selector: 'app-liste-service',
  templateUrl: './liste-service.page.html',
  styleUrls: ['./liste-service.page.scss'],
})
export class ListeServicePage implements OnInit {
	allData:any={};
  constructor( private modalController: ModalController,  private navParams: NavParams) { }

  ngOnInit() {
	  this.allData = this.navParams.get('allData');
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  

}
