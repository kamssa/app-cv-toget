import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ModeleService } from 'src/app/services/modele.service';
import { MessageAlerteService } from 'src/app/services/message-alerte.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
public email:any;
public code:any
  constructor(private modalCtrl: ModalController,
    private modelService: ModeleService,
    private toastController: ToastController,
    private  messageAlerte: MessageAlerteService,
    private navParams: NavParams
    ) { }

  ngOnInit() {
    this.email=this.navParams.get('email');
  }

  public codeVerify() {
    this.modelService.codeVerify(this.email,this.code).subscribe(data => {
      if (data['status'] == 200) {
        this.modalCtrl.dismiss().then(()=>{
          this.onRestPassword();
        });
       
      } else {
        data['status'] != 200;
        let message = data['message'];
        this.messageAlerte.presentAlert('', message);
      }
    },
      error => {
        console.log("erreur ");
      });
 
}


  async onRestPassword(){
    const modal = await this.modalCtrl.create({
      component: ResetPasswordComponent,
      componentProps:{
        code: this.code,
        email: this.email
      }
    });
    return await modal.present();
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

 

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
