import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, PopoverController, ActionSheetController   } from '@ionic/angular';
import {SingleCartePage} from '../single-carte/single-carte.page';
@Component({
  selector: 'app-liste-service',
  templateUrl: './liste-service.page.html',
  styleUrls: ['./liste-service.page.scss'],
})
export class ListeServicePage implements OnInit {
	allData:any={};
  constructor( private modalController: ModalController, public popoverController: PopoverController, private navParams: NavParams, public actionSheetController: ActionSheetController) { }

  ngOnInit() {
	  this.allData = this.navParams.get('allData');
  }


    async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SingleCartePage,
      event: ev,
       mode: 'ios',
	   componentProps: {		
		allData : this.allData
      }
	 
    });
    return await popover.present();
  }
  
   dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
   async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu téléphonique',
      buttons: [{
        text: this.allData.person_tel_perso,
        role: 'destructive',
        icon: 'call',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  
}
