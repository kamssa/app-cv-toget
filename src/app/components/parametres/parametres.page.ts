import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController  } from '@ionic/angular';
import {NotificationComponent} from '../../params/notification/notification.component';
import {SecuriteComponent} from '../../params/securite/securite.component';
import {StockageComponent} from '../../params/stockage/stockage.component';
import { from } from 'rxjs';
import { ComptePage } from '../../compte/compte.page';
@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.page.html',
  styleUrls: ['./parametres.page.scss'],
})
export class ParametresPage implements OnInit {

  constructor(private modalCtrl: ModalController, public alertController: AlertController) { }

  ngOnInit() {
  }

  async showCompte() {
    const modal = await this.modalCtrl.create({
        component: ComptePage,
    });
    return await modal.present();
  }
  
  closeModal(){
    this.modalCtrl.dismiss();
  }
  async onNotify(){
    const modal = await this.modalCtrl.create({
      component: NotificationComponent,
     
    });
    return await modal.present();
  }
  async onSecurity(){
    const modal = await this.modalCtrl.create({
      component: SecuriteComponent,
     
    });
    return await modal.present();
  }
  async onStockage(){
    const modal = await this.modalCtrl.create({
      component: StockageComponent,
     
    });
    return await modal.present();
  }
  
  
  
    async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }
  
  
  
    async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
  }
  
  
   async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Voulez-vous vraiment supprimer votre compte ?',
      inputs: [
        {
          name: 'mdp',
          type: 'password',
          placeholder: 'Votre mot de passe svp!'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Supprimer',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
