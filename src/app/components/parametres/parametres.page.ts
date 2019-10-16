import { Component, OnInit } from '@angular/core';
import { ModalController,  ToastController  } from '@ionic/angular';

import {SecuriteComponent} from '../../params/securite/securite.component';

import {CguComponent} from '../../params/cgu/cgu.component';



@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.page.html',
  styleUrls: ['./parametres.page.scss'],
})
export class ParametresPage implements OnInit {

  constructor(private modalCtrl: ModalController,   public toastCtrl: ToastController ) { }

  ngOnInit() {
  }


  closeModal(){
    this.modalCtrl.dismiss();
  }

  async onSecurity(){
    const modal = await this.modalCtrl.create({
      component: SecuriteComponent,
     
    });
    return await modal.present();
  }

  async onCgu(){
    const modal = await this.modalCtrl.create({
      component: CguComponent,
    });
    return await modal.present();
  }
  async presentToast(param) {
        const toast = await this.toastCtrl.create({
          message: param,
          duration: 3000,
          position: "middle"
        });
        toast.present();
      }
	
	keypre(){
		alert('Félicitation: votre application est à jour et en version officielle.');
	}
}
