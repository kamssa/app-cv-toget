import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-a-props',
  templateUrl: './a-props.page.html',
  styleUrls: ['./a-props.page.scss'],
})
export class APropsPage implements OnInit {

  constructor(private modalCtrl: ModalController, private socialSharing: SocialSharing, private toastController: ToastController) { }

  ngOnInit() {
  }
  closeModal(){
    this.modalCtrl.dismiss();
    
  }
  
    share(text= null, image=null, link=null) {

		
        this.socialSharing.share('https://play.google.com/store/apps/details?id=pro.toget.togetme&hl=fr', image, link)
            .then(() => {

				this.presentToast( "Element partagé avec succès !");
            }).catch(() => {
				
			this.presentToast( "Une Erreur est survenue pendant l'opération !");
        });
		
    }
	
	
	  		async presentToast(text: string) {
			const toast = await this.toastController.create({
				message: text,
				duration: 2000
			});
			toast.present();

		}
}
