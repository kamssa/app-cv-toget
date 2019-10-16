import { Injectable } from '@angular/core';
import {AlertController, NavController, ToastController} from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class MessageAlerteService {

  constructor( private alertCtrl: AlertController,
               private toastController: ToastController) {
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
 
  async presentAlert(title, text) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: text,
      buttons: ['OK']
    });

    await alert.present();
  }

}
