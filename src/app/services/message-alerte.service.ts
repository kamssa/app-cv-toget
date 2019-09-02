import { Injectable } from '@angular/core';
import {AlertController, NavController, ToastController} from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class MessageAlerteService {

  constructor( private alertCtrl: AlertController,
               private toastController: ToastController,
               private navCtrl: NavController) {
  }
  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present().then(() => {
      location.replace('/tabs/ma-collection');
    });

  }
  async presentToastWithOptions(text: string) {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  async presentAlert(title, text) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: text,
      buttons: ['OK']
    });

    await alert.present();
  }

}
