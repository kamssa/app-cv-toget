import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import {ParametresPage} from '../parametres/parametres.page';
import {AidePage} from '../../aide/aide.page';
import {APropsPage} from '../../a-props/a-props.page';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-plus-info',
  templateUrl: './plus-info.component.html',
  styleUrls: ['./plus-info.component.scss'],
})
export class PlusInfoComponent implements OnInit {

  constructor(private modalController: ModalController, private platform: Platform,
    public alertCtrl: AlertController) { }
      
    
ngOnInit() {}

  async onParam() {
    const modal = await this.modalController.create({
      component: ParametresPage,
     
    });
    return await modal.present();
  }

  async onAide(){
    const modal = await this.modalController.create({
      component: AidePage
    });
    return await modal.present();
  }
  async onApropos(){
    const modal = await this.modalController.create({
      component: APropsPage
    });
    return await modal.present();
  }
  onQuitter(){
    this.presentAlerte();
  }
  async presentAlerte() {
    const alert = await this.alertCtrl.create({
      header: 'Voulez-vous vraiment quitter ?',
      subHeader: '',
      buttons: [{
        text: 'Non',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Oui',
        handler: () => {
        navigator['app'].exitApp();
           }
      }]
    });

    await alert.present();
  }
}
