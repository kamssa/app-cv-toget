import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {Platform} from '@ionic/angular';
// import { ModalController } from '@ionic/angular';
import {EntreprisePage} from '../entreprise/entreprise.page';
@Component({
  selector: 'app-particulier',
  templateUrl: './particulier.page.html',
  styleUrls: ['./particulier.page.scss'],
})
export class ParticulierPage implements OnInit {

  
public photoUrl: string;

  constructor(private photoViewer: PhotoViewer,private platform: Platform, private modalController: ModalController) { 
  this.viewPhoto();
  }
   

  ngOnInit() {
  }
  viewPhoto(){
     this.platform.ready().then(()=> {
      this.photoUrl ='assets/carte/carte1.png';
      const title = "carte de visite exemple";
      const options = {
        share: true
      }
      this.photoViewer.show(this.photoUrl, title, options);
    });
    
  }
  
  
    openPreview(img) {
    this.modalController.create({
      component: EntreprisePage,
      componentProps: {
        img: img
      }
    }).then(modal => {
      modal.present();
    });
  }

}
