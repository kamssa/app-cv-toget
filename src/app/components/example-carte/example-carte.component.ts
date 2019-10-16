import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {ModalController, ToastController, AlertController } from '@ionic/angular';
import { ModeleService } from '../../services/modele.service';
import { AppConfig } from '../../parametre/config';
@Component({
  selector: 'app-example-carte',
  templateUrl: './example-carte.component.html',
  styleUrls: ['./example-carte.component.scss'],
})
export class ExampleCarteComponent implements OnInit {

  @Input('_id') _id: number;
  @Input('code') code : string;
  @Input('content') content : string;
  @Input('image_fond') image_fond: string;
  @Output() share = new  EventEmitter<any>();
  @Output() ajouter = new  EventEmitter<any>();


  @ViewChild('innerHtml', {static: false}) innerHtml : ElementRef;


  link:any;
	public entreprise:any=[];
	public link_img = AppConfig.image_url;
  constructor(private modalCtrl: ModalController, public alertController: AlertController, private modelService: ModeleService, public toastCtrl: ToastController) { }

  ngOnInit() {
	  
	  this.getEntreprise();
  }

  onPartager(){
    this.link = 'http://192.168.8.200:8100/share/'+this._id+'/'+this.code;
    this.share.emit({value:this.link});

  }
  onAjouter(){
    this.ajouter.emit({value:this._id});
   }
   
   
async closeModal() {
 await this.modalCtrl.dismiss();
}
   


  async presentAlertConfirm(param, img) {
	  
	  let header = 'Information Entreprise';
	  let content = ' <img src='+img+' class="alert-togetme" alt="Logo" style=""/><br/> <span style="color:#09c; float: right; text-decoration:underline;"> '+param.entreprise_nom_commercial+' </span> <br/> <a style="color:#09c; float: right; text-decoration:underline;" href="mailTo:'+param.entreprise_email+'"> Email : '+param.entreprise_email+' </a> <br/> <a href="http://'+param.entreprise_site_web+'" style="color:#09c; float: right; text-decoration:underline;">'+param.entreprise_site_web+' </a> <br/> <a href="tel:'+param.entreprise_telephone+'" style="color:#09c; float: right; text-decoration:underline;"> '+param.entreprise_telephone+' </a> / <a href="tel:'+param.entreprise_mobile+'" style="color:#09c; float: right; text-decoration:underline;">'+param.entreprise_mobile+' </a>';
    const alert = await this.alertController.create({
      header:header ,
      message: content,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: OK');
          }
        }
      ]
    });

    await alert.present();
  }
  
   getEntreprise(){

                this.modelService.searchEntreprise().subscribe(resp => {
                       if(resp['status'] === 200){
                           this.entreprise = resp['data'];						   
                       } else {
                          this.presentToasts('Une erreur est survenue. Veuillez réessayer ');
                       }

                    },err => {
                         this.presentToasts('erreur, Veuillez verifier votre connexion internet! ');
                    });

            
  }
  
  
    async presentToasts(text: string) {
		
        const toast = await this.toastCtrl.create({
            message: text,
            duration: 2000
        });
        toast.present();

    }
}
