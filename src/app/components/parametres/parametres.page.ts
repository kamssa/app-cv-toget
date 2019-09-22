import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController  } from '@ionic/angular';
import {NotificationComponent} from '../../params/notification/notification.component';
import {SecuriteComponent} from '../../params/securite/securite.component';
import {StockageComponent} from '../../params/stockage/stockage.component';
import {CguComponent} from '../../params/cgu/cgu.component';
import { from } from 'rxjs';
import { ComptePage } from '../../compte/compte.page';
import {RegisterService} from '../../services/register.service';
import {UserModel} from '../../models/user.model';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.page.html',
  styleUrls: ['./parametres.page.scss'],
})
export class ParametresPage implements OnInit {

  constructor(private modalCtrl: ModalController, public alertController: AlertController, private auths: RegisterService,  private storage: Storage, private router: Router, public toastCtrl: ToastController ) { }

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
  async onCgu(){
    const modal = await this.modalCtrl.create({
      component: CguComponent,
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
          handler: (data) => {
			  
            console.log('Confirm Ok');
				  if(data.mdp.length <= 3 ){
					   this.presentToast( "Erreur. Veuillez remplir les champs svp !");
						return false;
				  }else{
							let r:number = 0;
							r = this.delete_compte(data.mdp);
							 if(r === 0){
								 return false;
							 }else{
								 alert.dismiss();
							 }
					  
				  }
			 return false;
          }
        }
      ]
    });

    await alert.present();
  }
  
  
  delete_compte($pawd): any{
   
			this.storage.get('access_data').then(resp => {
					// resp.status=0;
					let data : any ={id_user: resp.id_user, statut : 0, password : $pawd, lastPassword: $pawd}
					this.auths.updateProfilDelete(data).subscribe(resp => {
						   if(resp['status'] === 200){
								 this.presentToast(resp['message']);
								 return 1;
								     this.auths.logout();
								console.log('deconnexion');
								this.presentToast('Déconnexion réussie');
						   } else {
							  this.presentToast(resp['message']);
							  return 0;
						   }

						},err => {
							 this.presentToast(resp['message']);
							 return 0;
						});
            });



    
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
